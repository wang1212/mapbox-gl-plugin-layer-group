// more see http://rollupjs.org/guide/en/#configuration-files

import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import progress from 'rollup-plugin-progress'
import visualizer from 'rollup-plugin-visualizer'
import filesize from 'rollup-plugin-filesize'

const name = 'myLib'

export default {
	input: 'src/index.ts',
	output: [
		{
			file: 'build/bundle.js',
			format: 'iife',
			name,
			// globals: { cesium: 'Cesium' },
			sourcemap: true,
		},
		{
			file: 'build/bundle.min.js',
			format: 'iife',
			name,
			// globals: { cesium: 'Cesium' },
			sourcemap: true,
			plugins: [terser()],
		},
		{
			file: 'build/bundle.umd.js',
			format: 'umd',
			name,
			// globals: { cesium: 'Cesium' },
			sourcemap: true,
		},
		{
			file: 'build/bundle.umd.min.js',
			format: 'umd',
			name,
			// globals: { cesium: 'Cesium' },
			sourcemap: true,
			plugins: [terser()],
		},
		{
			file: 'build/bundle.esm.js',
			format: 'es',
			sourcemap: true,
		},
		{
			file: 'build/bundle.esm.min.js',
			format: 'es',
			sourcemap: true,
			plugins: [terser()],
		},
		{
			file: 'build/bundle.cjs.js',
			format: 'cjs',
			sourcemap: true,
		},
		{
			file: 'build/bundle.cjs.min.js',
			format: 'cjs',
			sourcemap: true,
			plugins: [terser()],
		},
	],
	plugins: [
		typescript({ useTsconfigDeclarationDir: true }),
		progress({
			clearLine: false, // default: true
		}),
		visualizer({ sourcemap: true, open: false, gzipSize: false }),
		filesize(),
	],
	external: [],
}
