import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
  alias: {
    '@': __dirname
  },
  plugins: [WindiCSS(), reactRefresh()]
});
