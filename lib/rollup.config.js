const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const typescript = require('rollup-plugin-typescript2')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')

module.exports = {
  input: 'index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true
    }),
    commonjs(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    })
  ],
  external: ['react', 'react-dom', 'framer-motion', 'lucide-react']
}