import { type RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import copy from "rollup-plugin-copy";
import terser from "@rollup/plugin-terser";

const configs: RollupOptions[] = [
  {
    input: "src/content-script.ts",
    output: {
      file: "dist/content-script.js",
      format: "iife",
      sourcemap: "inline",
    },
    plugins: [
      del({ targets: "dist" }),
      copy({
        targets: [{ src: "public/**.*", dest: "dist" }],
      }),
      typescript(),
      terser(),
    ],
  },
  {
    input: "src/popup.ts",
    output: {
      file: "dist/popup.js",
      format: "es",
      sourcemap: "inline",
    },
    plugins: [typescript(), terser()],
  },
  {
    input: "src/service-worker.ts",
    output: {
      file: "dist/service-worker.js",
      format: "es",
      sourcemap: "inline",
    },
    plugins: [typescript(), terser()],
  },
];

export default configs;
