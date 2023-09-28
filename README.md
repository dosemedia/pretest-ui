# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


## Dev notes

npm create vite@latest hasura-base-react -- --template react-ts

Why was https://primereact.org/ selected
- lots of components (free)
- flexible icons
- Figma Support (not free, but that's ok)
- Decent appearance

Note, also uses https://reactrouter.com/

TODO Why was mobx selected?

TODO : https://tanstack.com/query/v3/
https://formidable.com/open-source/urql/

TODO : Run as an app with https://capacitorjs.com/solution/react

TODO add note about running this when api changes AND when queries are added to code:
```
yarn codegen
```

Note, edited codegen.ts from urql docs to include .ts and .tsx files.
