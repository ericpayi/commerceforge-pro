/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'CommerceForge Pro',
        short_name: 'CommerceForge',
        description: 'A production-ready React e-commerce experience.',
        theme_color: '#0f172a',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [{ src: '/vite.svg', sizes: '192x192', type: 'image/svg+xml' }],
      },
    }),
  ],
  test: { environment: 'jsdom', globals: true, setupFiles: './src/test/setup.ts' },
});
