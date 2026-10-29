//external
import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projName: string = "ez-encrypt";

export default defineConfig({
    plugins: [
        dts({
            include: ["src"],
            outDirs: "./dist/external",
            tsconfigPath: "./tsconfig.json",
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: projName,
            fileName: (format) => `${projName}.${format}.js`,
        },
        rollupOptions: {
            //将dependencies和peerDependencies外部化
            external: [
                ...Object.keys(pkg.dependencies ?? {}),
                ...Object.keys(pkg.peerDependencies ?? {}),
            ],
        },
        //源码映射
        sourcemap: true,
        //压缩
        minify: true,
        outDir: "dist/external",
    },
});
