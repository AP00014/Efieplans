import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Project } from '../types/index';

// Simplified hook without cache for debugging

export const useCachedProjects = (limit: number = 6) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    console.log('useCachedProjects: Starting fetchProjects, limit:', limit);
    try {
      setLoading(true);
      setError(null);

      console.log('useCachedProjects: Fetching from network');
      // Fetch from network with timeout
      const fetchPromise = supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );

      const result = await Promise.race([fetchPromise, timeoutPromise]);
      const { data, error: fetchError } = result;

      console.log('useCachedProjects: Network response:', { data: data?.length, error: fetchError });

      if (fetchError) throw fetchError;

      // Transform database data to match Project type
      const transformedProjects: Project[] = (data || []).map((project) => ({
        id: project.id,
        title: project.title,
        description: project.description,
        status: project.status as "completed" | "ongoing",
        image: project.image,
        location: project.location,
        category: project.category || undefined,
        details: project.details || {
          specifications: {},
          timeline: undefined,
          materials: undefined,
          features: undefined,
          imageGallery: undefined,
          blueprints: undefined,
          videos: undefined,
          virtualTour: undefined,
        },
        created_at: project.created_at,
        updated_at: project.updated_at,
        created_by: project.created_by,
      }));

      console.log('useCachedProjects: Transformed projects:', transformedProjects.length);
      setProjects(transformedProjects);

    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error
  };
};