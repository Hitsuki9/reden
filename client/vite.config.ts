import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import WindiCSS from 'vite-plugin-windicss';
import graphql from '@rollup/plugin-graphql';

export default defineConfig({
  plugins: [WindiCSS(), graphql(), reactRefresh()]
});
