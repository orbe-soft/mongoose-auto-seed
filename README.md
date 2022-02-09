# mongoose-auto-seed

---

This is an util for mongoose, when you can execute and create seeders and call programmatically.

### Getting Started

> yarn add @orbe/mongoose-auto-seed

After you install the package, just use in your application:

```ts 
  import autoSeed from "@orbe/mongoose-auto-seed";
  import seederOne from "../seederOne";

  autoSeed.setup([
    seederOne
  ]);

  await autoSeed.startup();
```

```ts
  /** seederOne file */
  import Schema from "../Schema";

  /** await Schema.create(...) */
  /** ... */
```


