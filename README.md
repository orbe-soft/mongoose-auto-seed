# mongoose-automatic-seed

[![CI](https://github.com/orbe-soft/mongoose-auto-seed/actions/workflows/automated-tests.yaml/badge.svg)](https://github.com/orbe-soft/mongoose-auto-seed/actions/workflows/automated-tests.yaml)

This is an util for mongoose, that you can execute and create seeders and call it programmatically.

### Getting Started

> yarn add mongoose-automatic-seed

After you install the package, just use in your application:

```ts
import autoSeed from "mongoose-automatic-seed";
import mySeeder from "mySeeder";

await autoSeed.startup([mySeeder]);
```

```ts
/** MySeeder */
import { Seeder } from "mongoose-automatic-seed";

export default class MySeeder implements Seeder {
  /** Execute only one time */
  unique = true;

  title = "2908njk4012";

  async start(): Promise<void> {
    /** @todo */
  }
}
```
