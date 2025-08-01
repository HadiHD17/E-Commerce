# E-commerce Client

> Powered by React + Vite.

### Naming Conventions

- **Folders and files**: **ALL files MUST** use `kebab-case` (e.g.,
  `example-component.jsx`, `user-slice.js`, `use-foo.js`).
- **Components**: Each component folder must contain three files:
    - `index.jsx` → component entry point
    - `<component-name>.css` → styles scoped to the component

### Structure Rules

- **Assets**: Assets that you'll **IMPORT in your JS code** (e.g. images and
  fonts) should be located in `src/assets/`.
    - Otherwise, add them to the `public/` folder
- **Hooks**: Located in `src/hooks/`.
- **Context Providers**: Located in `src/context/`.
- **General styles, utilities, and resets**: In `src/styles/`.
- **Helper functions**: In `src/utils/`.
- **API helpers & initiators**: In `src/api/`.
- **Redux store & slices**: In `src/store/`.

### Import Aliasing

- Use `@/` alias for imports within `src/`:

```js
import ExampleComponent from "@/components/example-component";
import useCustomHook from "@/hooks/use-custom-hook";
import { fetchData } from "@/api/api";
```
