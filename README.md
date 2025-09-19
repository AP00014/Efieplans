# Stone Edge Construction - React + TypeScript + Vite

A modern, responsive construction company website built with React, TypeScript, and Vite.

## Features

- **Modern UI/UX**: Advanced glassmorphism design with smooth animations
- **Responsive Design**: Mobile-first approach with fluid typography
- **Dark Mode Support**: Automatic theme switching with system preferences
- **Form Validation**: Real-time validation with micro-interactions
- **Google Maps Integration**: Interactive location mapping
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Performance**: Optimized animations and lazy loading

## Google Maps Setup

The contact section includes Google Maps integration. To enable real maps:

1. **Get a Google Maps API Key**:
   - Visit [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
   - Create a new project or select existing one
   - Enable the **Maps Embed API**
   - Create credentials (API Key)

2. **Configure API Key**:
   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Add your API key to .env
   VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

3. **Restrict API Key** (Recommended for security):
   - In Google Cloud Console, go to APIs & Services > Credentials
   - Click on your API key
   - Add application restrictions (HTTP referrers)
   - Add API restrictions (Maps Embed API only)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **React 19** - Modern React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first styling (custom implementation)
- **Google Maps API** - Location services integration

## Project Structure

```
src/
├── components/
│   ├── home/
│   │   ├── ContactSection.tsx    # Contact form with Google Maps
│   │   └── ...
│   └── ...
├── styles/
│   ├── components/
│   │   └── ContactSection.css    # Advanced styling
│   └── ...
└── ...
```

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
