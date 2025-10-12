import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wroqkppgfeqixyspxkmo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indyb3FrcHBnZmVxaXh5c3B4a21vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMzQxMDMsImV4cCI6MjA3NTYxMDEwM30.MmeQ7Oqt_obs9gsOB7k-KtNv6NDlLLq5icvH4vDVV0o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('Supabase client created successfully');