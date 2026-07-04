import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import boundaries from 'eslint-plugin-boundaries'

// Fronteiras (feature-first):
//  - app pode usar shared e modules
//  - shared só pode usar shared (nunca importa feature)
//  - um module pode usar shared e ELE MESMO, nunca outra feature
export default tseslint.config(
  { ignores: ['dist', 'dev-dist', 'node_modules', 'scripts'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: { globals: { ...globals.browser } },
    plugins: { boundaries },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/*.{ts,tsx}', mode: 'file' },
        { type: 'shared', pattern: 'src/shared/**' },
        { type: 'module', pattern: 'src/modules/*', capture: ['name'] },
      ],
    },
    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'app', allow: ['shared', 'module'] },
            { from: 'shared', allow: ['shared'] },
            { from: 'module', allow: ['shared', ['module', { name: '${from.name}' }]] },
          ],
        },
      ],
    },
  },
)
