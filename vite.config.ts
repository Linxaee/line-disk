import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		eslintPlugin({
			include: ["src/**/*.js", "src/**/*.vue", "src/*.js", "src/*.vue"],
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			components: path.resolve(__dirname, "src/components"),
			views: path.resolve(__dirname, "src/views"),
			layouts: path.resolve(__dirname, "src/layouts"),
			utils: path.resolve(__dirname, "src/utils"),
			dirs: path.resolve(__dirname, "src/directives"),
		},
	},
});
