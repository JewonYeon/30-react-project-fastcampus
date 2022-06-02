import htmlTemplate from 'rollup-plugin-generate-html-template';
import scss from 'rollup-plugin-scss';

export default {
  input: 'src/js/index.js',
  output: {
    file: './dist/bundle.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    htmlTemplate({
      template: 'src/index.html',
      target: 'index.html',
    }),
    scss({
      insert: true,
      sourceMap: true,
    }),
  ],
};