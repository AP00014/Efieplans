# Settings Page Setup Guide

## Overview
A complete settings page has been created where users can:
- Change their name (full name)
- Change their username
- Upload and change their profile picture (avatar)
- Remove their avatar

## Files Created/Modified

### New Files
1. **src/pages/SettingsPage.tsx** - Main settings page component
2. **src/pages/SettingsPage.css** - Styled with site colors and advanced responsiveness
3. **supabase_avatar_bucket_schema.sql** - SQL schema for avatar bucket setup

### Modified Files
1. **src/components/UserAvatar.tsx** - Added navigation to settings page
2. **src/App.tsx** - Added `/settings` route

## Setup Instructions

### 1. Create Avatar Bucket in Supabase

You need to run the SQL schema file to create the avatar bucket with proper RLS policies:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL from `supabase_avatar_bucket_schema.sql`

This will:
- Create a public `avatar` bucket
- Set up Row Level Security (RLS) policies
- Allow users to upload/update/delete only their own avatars
- Allow everyone to view all avatars

### 2. Verify Bucket Creation

After running the SQL:
1. Go to Storage in your Supabase dashboard
2. Verify that the `avatar` bucket exists
3. Check that it's set to public
4. Verify RLS policies are active

### 3. Test the Settings Page

1. Log in to your application
2. Click on your avatar in the header
3. Click "Settings" from the dropdown
4. Test uploading an avatar
5. Test changing your name
6. Test changing your username
7. Test removing your avatar

## Features

### Authentication
- Users must be logged in to access settings
- Automatic redirect to home if not authenticated
- Proper error handling for authentication failures

### Avatar Management
- Upload new avatar (JPEG, PNG, GIF, WebP)
- Maximum file size: 5MB
- Preview before saving
- Remove avatar functionality
- Automatic cleanup of old avatars
- Avatars stored in user-specific folders: `{user_id}/{filename}`

### Profile Management
- Change full name
- Change username (with validation)
- Username uniqueness check
- Real-time validation feedback
- Email display (read-only)

### Styling
- Uses site colors (orange primary, yellow accent, dark blue secondary)
- Advanced responsive design
- Dark mode support
- Smooth animations and transitions
- Beautiful glassmorphism effects
- Mobile-first approach

## Security

### RLS Policies
- Users can only upload/update/delete their own avatars
- Files are stored in user-specific folders
- Public read access for all avatars
- Proper authentication checks

### Validation
- Username validation (minimum 3 characters, alphanumeric + underscore)
- File type validation (images only)
- File size validation (max 5MB)
- Username uniqueness check

## Responsive Design

The settings page is fully responsive:
- **Desktop**: Full-width layout with side-by-side sections
- **Tablet**: Optimized layout with adjusted spacing
- **Mobile**: Stacked layout with full-width buttons
- **Small Mobile**: Compact layout with smaller avatar preview

## Color Scheme

The page uses your site's color scheme:
- **Primary**: Orange (#FF8C00)
- **Accent**: Yellow (#FACC15)
- **Secondary**: Dark Blue (#1A1A2E)
- **Success**: Green (#10B981)
- **Error**: Red (#EF4444)

## Troubleshooting

### Avatar upload fails
- Check that the `avatar` bucket exists
- Verify RLS policies are set up correctly
- Check file size (must be < 5MB)
- Verify file type (JPEG, PNG, GIF, WebP only)

### Username already taken
- The system checks for username uniqueness
- Users cannot use a username that's already taken by another user
- Try a different username

### Avatar not displaying
- Check that the bucket is set to public
- Verify the avatar_url in the profiles table
- Check browser console for errors

## Notes

- The avatar bucket should be created before users can upload avatars
- Old avatars are automatically deleted when a new one is uploaded
- Users can remove their avatar, which will set avatar_url to null
- The settings page requires authentication

