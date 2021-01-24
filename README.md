# typedoc-plugin-not-exported

[![npm package](https://img.shields.io/badge/npm%20i-typedoc--plugin--not--exported-brightgreen)](https://www.npmjs.com/package/typedoc-plugin-not-exported) [![version number](https://img.shields.io/npm/v/typedoc-plugin-not-exported?color=green&label=version)](https://github.com/tomchen/typedoc-plugin-not-exported/releases) [![License](https://img.shields.io/github/license/tomchen/typedoc-plugin-not-exported)](https://github.com/tomchen/typedoc-plugin-not-exported/blob/main/LICENSE)

This typedoc plugin can force inclusion of specific symbols (variables) that are not exported, by making them fake exports.

Install the plugin:

```bash
npm i typedoc-plugin-not-exported
```

In your code, tag the symbols (variables / types / interfaces / classes etc.) that are not exported but you still want to include in the generated documentation.

The default tag is `@notExported`.

Example 1:

```ts
/**
 * My class
 * @notExported
 */
class Cls {
  convert(str: string): string {
    return str
  }
}
export const me = new Cls()
```

Example 2:

```ts
/**
 * @notExported
 */
type twoNumbers = [number, number]
/**
 * @notExported
 */
type threeNumbers = [number, number, number]

export type twoOrThreeNumbers = twoNumbers | threeNumbers
export function sum2(ns: twoOrThreeNumbers): number {
  return ns.reduce((a, b) => a + b)
}
```

Then use the command as usual:

```bash
typedoc src/index.ts
```

Or, if you are using `@internalDoNotUse` tag instead of `@notExported`, run:

```bash
typedoc --includeTag internalDoNotUse src/index.ts
```

That's it.

Originally from [here](https://github.com/TypeStrong/typedoc/issues/1474#issuecomment-766178261).

[CC0](LICENSE).

**Keywords: typedoc plugin force include non exported unexported variable symbol fake export option flag tag mode file exclude inclusion internal external**
