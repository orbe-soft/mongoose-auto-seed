# mongoose-auto-seed
[![CI](https://github.com/orbe-soft/mongoose-auto-seed/actions/workflows/automated-tests.yaml/badge.svg)](https://github.com/orbe-soft/mongoose-auto-seed/actions/workflows/automated-tests.yaml)

This is an util for mongoose, that you can execute and create seeders and call it programmatically.

### Getting Started

> yarn add mongoose-automatic-seed

After you install the package, just use in your application:

```ts 
  import autoSeed from "@orbe/mongoose-auto-seed";
  import seederOne from "../seederOne";

  await autoSeed.startup([
    seederOne
  ]);
```

```ts
  /** seederOne file */
  import Schema from "../Schema";
  
  export const title = "seeder-one";

  export const start = () => {
    /** await Schema.create(...) */
    /** ... */
  }
```


