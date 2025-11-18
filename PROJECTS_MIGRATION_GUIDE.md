# Projects Database Migration Guide

This guide will help you migrate your existing projects from `data.ts` to the Supabase database.

## Step 1: Create the Projects Table

Run the SQL schema file in your Supabase SQL Editor:

1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `src/lib/supabase/projects_schema.sql`
4. Execute the SQL script

This will create:
- The `projects` table with all necessary columns
- Row Level Security (RLS) policies
- Indexes for performance
- Triggers for automatic `updated_at` updates

## Step 2: Migrate Existing Data

You have two options to migrate your existing projects from `data.ts`:

### Option A: Manual Migration via Admin Panel (Recommended)

1. Log in to your admin panel at `/admin`
2. Navigate to "Create Project"
3. For each project in `data.ts`, fill out the form with:
   - Title
   - Description
   - Status (completed/ongoing)
   - Main Image URL
   - Location
   - Category
   - Timeline (optional)
   - Virtual Tour URL (optional)
   - Specifications (add key-value pairs)
   - Materials (add one by one)
   - Features (add one by one)
   - Image Gallery URLs (add one by one)
   - Videos (add URL, type, and thumbnail)
   - Blueprints (add URLs)

### Option B: Bulk Migration via SQL Script

If you have many projects, you can create a migration script. Here's an example:

```sql
-- Example: Insert a project from data.ts
INSERT INTO projects (
  title,
  description,
  status,
  image,
  location,
  category,
  details
) VALUES (
  'The Metropol',
  'Contemporary 6-bedroom smart home with sustainable design',
  'ongoing',
  'https://res.cloudinary.com/dpzndrhse/image/upload/v1750667824/81945302_2141154495987458_8142382399708200960_n_cpcfed.jpg',
  'Accra,Ghana',
  'commercial',
  '{
    "specifications": {
      "height": "300m",
      "floors": "80",
      "area": "150,000 sq ft",
      "completion": "2022"
    },
    "timeline": "2018-2025",
    "materials": ["Reinforced Concrete", "Glass Facade", "Steel Framework"],
    "imageGallery": [
      "https://res.cloudinary.com/dpzndrhse/image/upload/v1750667945/img3_xmxexn.jpg",
      "https://res.cloudinary.com/dpzndrhse/image/upload/v1750667956/img4_trud1s.jpg"
    ],
    "videos": [
      {
        "url": "/videos/02673085c141fa1529b528534962bf26.mp4",
        "type": "local",
        "thumbnail": "https://res.cloudinary.com/dpzndrhse/image/upload/v1750667824/81945302_2141154495987458_8142382399708200960_n_cpcfed.jpg"
      }
    ],
    "blueprints": ["/downloads/skyscraper-structural.pdf"],
    "virtualTour": "https://3dtour.com/skyscraper"
  }'::jsonb
);
```

## Step 3: Verify Migration

1. Go to `/admin` → "Manage Projects"
2. Verify all projects are listed
3. Check a few projects by clicking on them from the Portfolio page (`/projects`)
4. Ensure all images, videos, and details are displaying correctly

## Step 4: Update Routes (Optional)

The routes are already updated to use UUIDs from the database. If you need to update any hardcoded project IDs in your codebase:

- Old format: `/projects/1`, `/projects/2` (numeric IDs)
- New format: `/projects/uuid-here` (UUID strings)

## Important Notes

1. **ID Format**: The database uses UUIDs (strings) instead of numeric IDs. The code has been updated to handle both formats for backward compatibility.

2. **Image URLs**: Make sure all image URLs in your projects are accessible. The system will display placeholder images if URLs are broken.

3. **Video Types**: 
   - `local`: Videos hosted on your server (e.g., `/videos/video.mp4`)
   - `external`: External videos (e.g., YouTube embeds)

4. **Categories**: Valid categories are:
   - `residential`
   - `commercial`
   - `town-houses`
   - `group-dualling`
   - `architectural`

5. **Status**: Must be either `completed` or `ongoing`

## Troubleshooting

### Projects not showing on Portfolio page
- Check that RLS policies allow public read access
- Verify projects exist in the database
- Check browser console for errors

### Cannot create projects in admin panel
- Ensure you're logged in as an admin user
- Check that your profile has `role = 'admin'` in the `profiles` table
- Verify RLS policies allow admin insert operations

### Images not loading
- Verify image URLs are correct and accessible
- Check CORS settings if images are on external domains
- Ensure image URLs use HTTPS

## Next Steps

After migration:
1. Test creating a new project via the admin panel
2. Test editing/deleting projects
3. Verify the Portfolio page displays all projects correctly
4. Check that project detail pages load properly
5. Consider removing or archiving `data.ts` once migration is complete

## Support

If you encounter any issues during migration, check:
- Supabase Dashboard → Logs for database errors
- Browser Console for frontend errors
- Network tab for API request failures

