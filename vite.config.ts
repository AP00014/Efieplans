import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Efieplans/",
  esbuild: {
    drop: ['console', 'debugger'],
  },

  // Build optimizations
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', '@uiw/react-md-editor'],
          'supabase-vendor': ['@supabase/supabase-js'],
        },
        // Optimize chunk naming for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Enable source maps for production debugging
    sourcemap: false,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'esbuild',
  },

  // Development server optimizations
  server: {
    // Enable HMR with better performance
    hmr: {
      overlay: true,
    },
    // Optimize dev server
    fs: {
      strict: true,
    },
  },

  // Dependency optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@supabase/supabase-js',
      'lucide-react',
    ],
    exclude: ['@vite/client', '@vite/env'],
  },

  // CSS optimizations
  css: {
    devSourcemap: true,
  },

  // Preview server optimizations
  preview: {
    port: 4173,
    strictPort: true,
  },
})
