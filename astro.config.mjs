import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import icon from 'astro-icon';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// Vite plugin for shader files
const shaderPlugin = {
  name: 'shader-loader',
  transform(code, id) {
    if (/\.(vert|frag)$/.test(id)) {
      return {
        code: `export default ${JSON.stringify(code)};`,
        map: null
      };
    }
  }
};

// Vite plugin for CSV files
const csvPlugin = {
  name: 'csv-loader',
  transform(code, id) {
    if (id.endsWith('.csv')) {
      const stringified = JSON.stringify(code);
      return {
        code: `export default ${stringified};`,
        map: null
      };
    }
  }
};

export default defineConfig({
  vite: {
    plugins: [shaderPlugin, csvPlugin, tailwindcss()]
  },

  integrations: [
    icon({
      include: {
        "line-md": ["*"]
      }
    }), 
    react(),
    mdx()
  ]
});