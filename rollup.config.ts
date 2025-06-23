import {type RollupOptions} from "rollup";
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
            sourcemap: "inline"
        },

        // `watch.include` 프로퍼티에 `public` 디렉터리를 포함하더라도 내용물의 변경을 감지하지
        // 못합니다. `watch.include`는 모듈 그래프만 필터링할 뿐, 감시할 파일을 추가하지 않습니다.
        //
        //     watch: {
        //         include: ["public/*"], ← 추가로 감시하지 않습니다.
        //     },
        //
        // 따라서 `public` 디렉터리 내의 변경 사항을 적용하려면, `npm run watch` 명령을
        // 재실행해야 합니다.

        plugins: [
            del({
                targets: "dist",
                runOnce: true
            }),
            copy({
                targets: [{src: "public/*", dest: "dist"}],
                copyOnce: true
            }),
            typescript(),
            terser()
        ]
    },
    {
        input: "src/popup.ts",
        output: {
            file: "dist/popup.js",
            format: "es",
            sourcemap: "inline"
        },
        plugins: [typescript(), terser()]
    },
    {
        input: "src/service-worker.ts",
        output: {
            file: "dist/service-worker.js",
            format: "es",
            sourcemap: "inline"
        },
        plugins: [typescript(), terser()]
    }
];

export default configs;
