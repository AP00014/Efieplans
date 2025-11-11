-- ============================================
-- Supabase Storage Bucket Setup for Avatars
-- ============================================
-- This schema creates a storage bucket for user avatar images
-- with Row Level Security (RLS) policies that allow:
-- - Everyone (including unauthenticated users) to view/read all avatars
-- - Authenticated users to upload, update, or delete their own avatars only
-- ============================================

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
   'avatar',
   'avatar',
   true, -- Public bucket so everyone can read
   5242880, -- 5MB file size limit
   ARRAY[
     'image/jpeg',
     'image/jpg',
     'image/png',
     'image/gif',
     'image/webp'
   ]
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- RLS Policies for Avatar Storage
-- ============================================

-- Enable RLS on storage.objects (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for clean re-run)
DROP POLICY IF EXISTS "Public Access: Anyone can view avatar files" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatars" ON storage.objects;

-- Policy 1: Allow everyone (including unauthenticated) to SELECT (view/read) all avatar files
-- This allows all users to see all avatars without authentication
CREATE POLICY "Public Access: Anyone can view avatar files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'avatar');

-- Policy 2: Allow authenticated users to INSERT (upload) their own avatars
-- Users can only upload files to their own folder (user_id/file_name)
-- The name column contains the full path: {user_id}/{file_name}
CREATE POLICY "Users can upload their own avatars"
ON storage.objects
FOR INSERT
WITH CHECK (
   bucket_id = 'avatar'
   AND auth.role() = 'authenticated'
   AND (name ~ ('^' || auth.uid()::text || '/'))
);

-- Policy 3: Allow authenticated users to UPDATE their own avatars
-- Users can only update files in their own folder
CREATE POLICY "Users can update their own avatars"
ON storage.objects
FOR UPDATE
USING (
   bucket_id = 'avatar'
   AND auth.role() = 'authenticated'
   AND (name ~ ('^' || auth.uid()::text || '/'))
)
WITH CHECK (
   bucket_id = 'avatar'
   AND auth.role() = 'authenticated'
   AND (name ~ ('^' || auth.uid()::text || '/'))
);

-- Policy 4: Allow authenticated users to DELETE their own avatars
-- Users can only delete files in their own folder
CREATE POLICY "Users can delete their own avatars"
ON storage.objects
FOR DELETE
USING (
   bucket_id = 'avatar'
   AND auth.role() = 'authenticated'
   AND (name ~ ('^' || auth.uid()::text || '/'))
);

-- ============================================
-- Notes:
-- ============================================
-- 1. The bucket is set to PUBLIC, which means files are accessible via public URLs
-- 2. Everyone can view/read all avatar files (authenticated or not) - Public access
-- 3. Authenticated users can upload files only to their own folder: {user_id}/{file_name}
-- 4. Authenticated users can update/overwrite only their own avatar files
-- 5. Authenticated users can delete only their own avatar files
-- 6. File size limit is set to 5MB (5242880 bytes)
-- 7. Only specific image MIME types are allowed for security
-- 8. The folder structure in the code uses: {user_id}/{file_name}
-- 9. The policies check that the folder name matches the user's ID (auth.uid())
-- 10. The bucket name is 'avatar' to match the code
-- ============================================

