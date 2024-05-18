import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	
	build:{
		target: "esnext",
		minify:"terser",
		terserOptions: {
			compress: true,
			mangle: true,

		}
	},
	
});