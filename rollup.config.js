import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const name = 'app';

export default (args) => {
  return {
    input: './src/index.tsx',

    output: {
      file: './dist/index.js',
      format: 'iife',
      name,
      sourcemap: isDevelopment,

      // https://rollupjs.org/guide/en/#outputglobals
      globals: {},
    },

    // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
    // https://rollupjs.org/guide/en/#external
    external: [],

    plugins: [
      // Allows node_modules resolution
      resolve({ extensions }),

      // Allow bundling cjs modules. Rollup doesn't understand cjs
      commonjs(),

      // Compile TypeScript/JavaScript files
      babel({
        extensions,
        babelHelpers: 'bundled',
        include: ['src/**/*'],
      }),

      isProduction && terser(),

      args.watch && livereload(),
    ],

    watch: {
      clearScreen: false,
    },
  };
};
