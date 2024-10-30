import { readFileSync } from "node:fs";
import esbuild from "rollup-plugin-esbuild";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// eslint-disable-next-line @typescript-eslint/no-var-requires

const bundle = (config) => ({
  ...config,
  input: "./src/index.ts",
});

export default [
  bundle({
    plugins: [resolve(),commonjs(), esbuild({ platform: "node", minify: true })],
    output: [
      {
        file: `./dist/index.js`,
        format: "cjs",
      },
    ],
  }),
];
