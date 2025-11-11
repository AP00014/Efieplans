import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate required environment variables
if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable. Please check your .env file.');
}
if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable. Please check your .env file.');
}

// Create client for regular app usage with custom fetch to remove apikey header
const customFetch = (url: RequestInfo | URL, options: RequestInit = {}) => {
  return fetch(url, options).then((response) => {
    // Remove apikey header from requests when Authorization header is present
    if (options.headers && 'Authorization' in options.headers) {
      const headers = new Headers(options.headers as HeadersInit);
      headers.delete('apikey');
      headers.delete('Authorization'); // Temporarily remove to avoid duplication
      headers.set('Authorization', options.headers['Authorization']); // Re-add clean Authorization
      options.headers = headers;
    }
    return response;
  });
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: customFetch,
  },
});

// Create service role client for admin operations (server-side only)
const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
export const supabaseAdmin = supabaseServiceRoleKey ? createClient(supabaseUrl, supabaseServiceRoleKey) : null;

// Environment variables for Edge Functions and configuration
export const env = {
  SUPABASE_URL: supabaseUrl,
  SUPABASE_ANON_KEY: supabaseAnonKey,
  SUPABASE_SERVICE_ROLE_KEY: supabaseServiceRoleKey || '',
  RESEND_API_KEY: import.meta.env.VITE_RESEND_API_KEY || '',
  ADMIN_EMAIL: import.meta.env.VITE_ADMIN_EMAIL || 'admin@efieplans.com',
  APP_TITLE: import.meta.env.VITE_APP_TITLE || 'Efie Plans',
  APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'Architectural & Construction Excellence'
};

// Helper functions for common operations
export const contactOperations = {
  async submitMessage(data: { name: string; email: string; subject: string; message: string }) {
    const { error } = await supabase
      .from('contact_messages')
      .insert([data]);

    if (error) throw error;
    return { success: true };
  },

  async getMessages() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateMessageStatus(id: string, status: string) {
    const { error } = await supabase
      .from('contact_messages')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  }
};

export const newsletterOperations = {
  async subscribeEmail(email: string) {
    const { error } = await supabase
      .from('email_subscriptions')
      .insert([{ email, is_active: true }]);

    if (error) throw error;
    return { success: true };
  },

  async getSubscriptions() {
    const { data, error } = await supabase
      .from('email_subscriptions')
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async toggleSubscriptionStatus(id: string, isActive: boolean) {
    const { error } = await supabase
      .from('email_subscriptions')
      .update({ is_active: isActive })
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  },

  async deleteSubscription(id: string) {
    const { error } = await supabase
      .from('email_subscriptions')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  }
};

export const userOperations = {
  async getUsers() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateUserRole(id: string, role: string) {
    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  },

  async banUser(id: string, isBanned: boolean) {
    const { error } = await supabase
      .from('profiles')
      .update({
        is_banned: isBanned,
        banned_at: isBanned ? new Date().toISOString() : null,
        ban_reason: isBanned ? 'Banned by admin' : null
      })
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  }
};

export const postOperations = {
  async getPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles: user_id (username, full_name)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createPost(postData: { title: string; content: string; image_url?: string; video_url?: string; tags?: string[]; category?: string }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('posts')
      .insert({
        user_id: user.id,
        ...postData
      });

    if (error) throw error;
    return { success: true };
  },

  async updatePost(id: string, postData: Partial<{ title: string; content: string; image_url?: string; video_url?: string; tags?: string[]; category?: string }>) {
    const { error } = await supabase
      .from('posts')
      .update({
        ...postData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  },

  async deletePost(id: string) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  }
};

console.log('Supabase client created successfully');