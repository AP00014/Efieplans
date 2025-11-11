-- ============================================
-- Supabase Storage Bucket Setup for Media
-- ============================================
-- This schema creates a storage bucket for media files (images and videos)
-- with Row Level Security (RLS) policies that allow:
-- - Everyone (including unauthenticated users) to view/read all media
-- - Only ADMIN users to upload, update, or delete media files
-- ============================================

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
   'storage',
   'storage',
   true, -- Public bucket so everyone can read
   null, -- No file size limit
   ARRAY[
     'image/jpeg',
     'image/jpg',
     'image/png',
     'image/gif',
     'image/webp',
     'video/mp4',
     'video/avi',
     'video/mov',
     'video/wmv',
     'video/webm'
   ]
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- RLS Policies for Storage
-- ============================================

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for clean re-run)
DROP POLICY IF EXISTS "Public Access: Anyone can view media files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload: Users can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload: Only admins can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update: Users can update media" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update: Only admins can update media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete: Users can delete media" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete: Only admins can delete media" ON storage.objects;

-- Policy 1: Allow everyone (including unauthenticated) to SELECT (view/read) all files
-- This allows all users to see all posted media without authentication
CREATE POLICY "Public Access: Anyone can view media files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'storage');

-- Policy 2: Allow only ADMIN users to INSERT (upload) files
-- Only users with admin role in profiles table can upload media
CREATE POLICY "Admin Upload: Only admins can upload media"
ON storage.objects
FOR INSERT
WITH CHECK (
   bucket_id = 'storage'
   AND auth.role() = 'authenticated'
   AND EXISTS (
     SELECT 1 FROM profiles
     WHERE profiles.id = auth.uid()
     AND profiles.role = 'admin'
   )
);

-- Policy 3: Allow only ADMIN users to UPDATE files
-- Only admins can update/overwrite media files
CREATE POLICY "Admin Update: Only admins can update media"
ON storage.objects
FOR UPDATE
USING (
   bucket_id = 'storage'
   AND auth.role() = 'authenticated'
   AND EXISTS (
     SELECT 1 FROM profiles
     WHERE profiles.id = auth.uid()
     AND profiles.role = 'admin'
   )
)
WITH CHECK (
   bucket_id = 'storage'
   AND auth.role() = 'authenticated'
   AND EXISTS (
     SELECT 1 FROM profiles
     WHERE profiles.id = auth.uid()
     AND profiles.role = 'admin'
   )
);

-- Policy 4: Allow only ADMIN users to DELETE files
-- Only admins can delete media files
CREATE POLICY "Admin Delete: Only admins can delete media"
ON storage.objects
FOR DELETE
USING (
   bucket_id = 'storage'
   AND auth.role() = 'authenticated'
   AND EXISTS (
     SELECT 1 FROM profiles
     WHERE profiles.id = auth.uid()
     AND profiles.role = 'admin'
   )
);

-- ============================================
-- Notes:
-- ============================================
-- 1. The bucket is set to PUBLIC, which means files are accessible via public URLs
-- 2. Everyone can view/read all media files (authenticated or not) - Public access
-- 3. Only ADMIN users (role = 'admin' in profiles table) can upload files
-- 4. Only ADMIN users can update/overwrite media files
-- 5. Only ADMIN users can delete media files
-- 6. No file size limit set (unlimited)
-- 7. Only specific MIME types are allowed for security
-- 8. The folder structure in your code uses: posts/images/ and posts/videos/
-- 9. The policies check the profiles table to verify the user has admin role
-- 10. The bucket name is 'storage' to match your Supabase setup
-- ============================================

