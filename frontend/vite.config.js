import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backendUrl = env.VITE_BACKEND_URL || 'http://127.0.0.1:8001'
  const disableHMR = env.VITE_DISABLE_HMR ? true : false;
  return defineConfig({
    plugins: [react()],
    server: {
      hmr: !disableHMR,
      allowedHosts: ['.kapucl.be', 'kotbd.kapucl.be'],
      proxy: {
        '/api': {
          target: backendUrl,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  })
}
