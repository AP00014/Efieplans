-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('completed', 'ongoing')),
  image TEXT NOT NULL, -- Main thumbnail image URL (displayed on Projects page)
  location TEXT NOT NULL,
  category TEXT CHECK (category IN ('residential', 'commercial', 'town-houses', 'group-dualling', 'architectural')),
  details JSONB NOT NULL DEFAULT '{}'::jsonb, -- Contains all project detail fields (see structure below)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Projects policies
-- Drop existing policies if they exist (for clean re-run)
DROP POLICY IF EXISTS "Projects are viewable by everyone" ON projects;
DROP POLICY IF EXISTS "Only admins can create projects" ON projects;
DROP POLICY IF EXISTS "Only admins can update projects" ON projects;
DROP POLICY IF EXISTS "Only admins can delete projects" ON projects;

-- Everyone can view projects
CREATE POLICY "Projects are viewable by everyone" ON projects FOR SELECT USING (true);

-- Only admins can create projects
CREATE POLICY "Only admins can create projects" ON projects FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Only admins can update projects
CREATE POLICY "Only admins can update projects" ON projects FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Only admins can delete any project
-- This policy allows any admin user to delete any project, regardless of who created it
CREATE POLICY "Only admins can delete projects" ON projects FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS projects_category_idx ON projects(category);
CREATE INDEX IF NOT EXISTS projects_status_idx ON projects(status);
CREATE INDEX IF NOT EXISTS projects_created_at_idx ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS projects_created_by_idx ON projects(created_by);

-- Trigger for updated_at
CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE projects IS 'Stores all project information including details, specifications, and media. Projects page displays main thumbnail (image field) and basic info. Project detail page shows full project information from details JSONB.';
COMMENT ON COLUMN projects.image IS 'Main thumbnail image URL displayed on the Projects/Portfolio page. When user clicks Explore button, they are forwarded to the project detail page. Can be a Supabase Storage URL (portfolio/{project_id}/thumbnails/{filename}) or external URL.';
COMMENT ON COLUMN projects.details IS 'JSONB object containing all project detail fields for the Project Detail page. Structure:
{
  "specifications": {                           -- Object with key-value pairs for project specifications
    "height": "string",                        -- Building/project height (e.g., "150m", "45 floors")
    "floors": "string",                        -- Number of floors (e.g., "45", "3")
    "area": "string",                          -- Total area/size (e.g., "50,000 sq ft", "15,000 sq ft per unit")
    "completion": "string",                    -- Completion date/year (e.g., "2022", "2024")
    "units": "string",                         -- Number of units (e.g., "180", "85 office suites")
    "bedrooms": "string",                      -- Bedroom count (e.g., "3-5 per unit", "2-4 per unit")
    "length": "string",                        -- Length measurements (e.g., "25km", "2.5km")
    "lanes": "string",                         -- Number of lanes (e.g., "6 lanes total")
    "parking": "string",                       -- Parking spaces (e.g., "200 spaces", "2 spaces per unit")
    "additional_specs": "string"               -- Any other custom specifications
  },
  "timeline": "string",                        -- Optional: Project timeline (e.g., "2018-2025")
  "materials": ["string", ...],                -- Optional: Array of material names
  "features": ["string", ...],                 -- Optional: Array of feature descriptions
  "imageGallery": ["url", ...],                -- Optional: Array of image URLs for gallery (can be Supabase Storage URLs: portfolio/{project_id}/images/{filename} or external URLs)
  "blueprints": ["url", ...],                  -- Optional: Array of blueprint file URLs (can be Supabase Storage URLs: portfolio/{project_id}/blueprints/{filename} or external URLs)
  "videos": [                                  -- Optional: Array of video objects
    {
      "url": "string",                         -- Video URL (Supabase Storage path: portfolio/{project_id}/videos/{filename} or external embed URL)
      "type": "local" | "external",            -- Video source type ("local" for Supabase Storage, "external" for YouTube/Vimeo/etc.)
      "thumbnail": "string"                    -- Thumbnail image URL for video (can be Supabase Storage URL: portfolio/{project_id}/thumbnails/{filename} or external URL)
    },
    ...
  ],
  "virtualTour": "string"                      -- Optional: Virtual tour URL
}
The specifications object contains common fields used across different project types, plus any additional custom specifications. All fields except specifications are optional. URLs can be Supabase Storage paths or external URLs.';

-- ============================================
-- Supabase Storage Bucket Setup for Projects
-- ============================================
-- This schema creates a storage bucket for project media files (images, videos, thumbnails, blueprints)
-- with Row Level Security (RLS) policies that allow:
-- - Everyone (including unauthenticated users) to view/read all project media
-- - Only ADMIN users to upload, update, or delete project media files
-- ============================================

-- Create the storage bucket for projects
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
   'portfolio',
   'portfolio',
   true, -- Public bucket so everyone can read
   null, -- No file size limit (or set to 104857600 for 100MB limit)
   ARRAY[
     'image/jpeg',
     'image/jpg',
     'image/png',
     'image/gif',
     'image/webp',
     'image/svg+xml',
     'video/mp4',
     'video/avi',
     'video/mov',
     'video/wmv',
     'video/webm',
     'video/quicktime',
     'application/pdf', -- For blueprints
     'application/zip', -- For blueprint archives
     'application/x-zip-compressed'
   ]
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- RLS Policies for Projects Storage
-- ============================================

-- Enable RLS on storage.objects (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for clean re-run)
DROP POLICY IF EXISTS "Public Access: Anyone can view project media files" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload: Only admins can upload project media" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update: Only admins can update project media" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete: Only admins can delete project media" ON storage.objects;

-- Policy 1: Allow everyone (including unauthenticated) to SELECT (view/read) all project files
-- This allows all users to see all project media without authentication
CREATE POLICY "Public Access: Anyone can view project media files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'portfolio');

-- Policy 2: Allow only ADMIN users to INSERT (upload) files to portfolio bucket
-- Only users with admin role in profiles table can upload project media
-- Folder structure: portfolio/{project_id}/images/, portfolio/{project_id}/videos/,
--                   portfolio/{project_id}/thumbnails/, portfolio/{project_id}/blueprints/
CREATE POLICY "Admin Upload: Only admins can upload project media"
ON storage.objects
FOR INSERT
WITH CHECK (
   bucket_id = 'portfolio'
   AND auth.role() = 'authenticated'
   AND EXISTS (
     SELECT 1 FROM profiles
     WHERE profiles.id = auth.uid()
     AND profiles.role = 'admin'
   )
);

-- Policy 3: Allow only ADMIN users to UPDATE files in portfolio bucket
-- Only admins can update/overwrite project media files
CREATE POLICY "Admin Update: Only admins can update project media"
ON storage.objects
FOR UPDATE
USING (
   bucket_id = 'portfolio'
   AND auth.role() = 'authenticated'
   AND EXISTS (
     SELECT 1 FROM profiles
     WHERE profiles.id = auth.uid()
     AND profiles.role = 'admin'
   )
)
WITH CHECK (
   bucket_id = 'portfolio'
   AND auth.role() = 'authenticated'
   AND EXISTS (
     SELECT 1 FROM profiles
     WHERE profiles.id = auth.uid()
     AND profiles.role = 'admin'
   )
);

-- Policy 4: Allow only ADMIN users to DELETE files from portfolio bucket
-- Only admins can delete project media files
CREATE POLICY "Admin Delete: Only admins can delete project media"
ON storage.objects
FOR DELETE
USING (
   bucket_id = 'portfolio'
   AND auth.role() = 'authenticated'
   AND EXISTS (
     SELECT 1 FROM profiles
     WHERE profiles.id = auth.uid()
     AND profiles.role = 'admin'
   )
);

-- ============================================
-- Storage Path Structure Documentation
-- ============================================
-- The portfolio bucket uses the following folder structure:
--
-- portfolio/
--   {project_id}/
--     images/
--       {filename}.jpg
--       {filename}.png
--       ...
--     videos/
--       {filename}.mp4
--       {filename}.webm
--       ...
--     thumbnails/
--       {filename}.jpg
--       {filename}.png
--       ...
--     blueprints/
--       {filename}.pdf
--       {filename}.zip
--       ...
--
-- Example paths:
-- - Main thumbnail: portfolio/{project_id}/thumbnails/main-thumbnail.jpg
-- - Gallery image: portfolio/{project_id}/images/gallery-image-1.jpg
-- - Video: portfolio/{project_id}/videos/project-video.mp4
-- - Video thumbnail: portfolio/{project_id}/thumbnails/video-thumbnail.jpg
-- - Blueprint: portfolio/{project_id}/blueprints/floor-plan.pdf
--
-- Public URL format (if bucket is public):
-- https://{supabase-project-id}.supabase.co/storage/v1/object/public/portfolio/{project_id}/images/{filename}
--
-- ============================================
-- Notes:
-- ============================================
-- 1. The bucket is set to PUBLIC, which means files are accessible via public URLs
-- 2. Everyone can view/read all project media files (authenticated or not) - Public access
-- 3. Only ADMIN users (role = 'admin' in profiles table) can upload files
-- 4. Only ADMIN users can update/overwrite project media files
-- 5. Only ADMIN users can delete project media files
-- 6. No file size limit set (unlimited) - consider setting a limit for production
-- 7. Only specific MIME types are allowed for security (images, videos, PDFs, ZIPs)
-- 8. The folder structure organizes files by project ID and media type
-- 9. The policies check the profiles table to verify the user has admin role
-- 10. The bucket name is 'portfolio' to match the projects table
-- 11. URLs stored in the database can be either Supabase Storage paths or external URLs
-- 12. When uploading, use the format: portfolio/{project_id}/{media_type}/{filename}
-- ============================================

