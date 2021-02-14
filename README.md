# typedoc-plugin-not-exported

[![npm package](https://img.shields.io/badge/npm%20i%20--D-typedoc--plugin--not--exported-brightgreen)](https://www.npmjs.com/package/typedoc-plugin-not-exported) [![version number](https://img.shields.io/npm/v/typedoc-plugin-not-exported?color=green&label=version)](https://github.com/tomchen/typedoc-plugin-not-exported/releases) [![Actions Status](https://github.com/tomchen/typedoc-plugin-not-exported/workflows/Test/badge.svg)](https://github.com/tomchen/typedoc-plugin-not-exported/actions) [![License](https://img.shields.io/github/license/tomchen/typedoc-plugin-not-exported)](https://github.com/tomchen/typedoc-plugin-not-exported/blob/main/LICENSE)

This [TypeDoc](https://typedoc.org/) plugin can force inclusion of specific symbols (variables) that are not exported, by making them fake exports.

## Usage

(Assuming you have already installed TypeDoc (`npm i -D typedoc`) of [version](https://www.npmjs.com/package/typedoc?activeTab=versions) **equal to or greater than v0.20.16** (released on 2021-01-17, this is the minimum required by this plugin. If you need to update the version, change TypeDoc's version number in package.json and rerun `npm i` / `yarn`))

Install the plugin with [npm](https://www.npmjs.com/):

```bash
npm i -D typedoc-plugin-not-exported
```

Or with [yarn](https://yarnpkg.com/):

```bash
yarn add -D typedoc-plugin-not-exported
```

In your code, tag the symbols (i.e. variables / types / interfaces / classes / object properties / class members etc.) that are not exported but you still want to include in the generated documentation.

The default tag is `@notExported`.

Example 1:

```ts
/**
 * My class
 * @notExported
 */
class MyClass {
  convert(str: string): string {
    return str
  }
}
export const me = new MyClass()
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
export function sum(ns: twoOrThreeNumbers): number {
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

## Links, Tips & Others

Originally from [here](https://github.com/TypeStrong/typedoc/issues/1474#issuecomment-766178261).

[CC0](LICENSE).

TypeDoc converts comments in TypeScript source code into rendered HTML documentation. See [Guides](https://typedoc.org/guides/installation/), [API](https://typedoc.org/api/) & [repo](https://github.com/TypeStrong/typedoc).

TypeDoc loads all plugins by default, if you want to specify plugins to load, use [`--plugin`](https://typedoc.org/guides/options/#plugin) flag.

Those non-exported symbols (variables) you want to include in the doc, are not public and the [`@public`](https://tsdoc.org/pages/tags/public/) tag shouldn't be applied. TypeDoc's `@internal` tag and [typedoc-plugin-internal-external](https://github.com/christopherthielen/typedoc-plugin-internal-external)'s `@internal` and `@external` are not made to solve the problem in question.

Nevertheless, if you want to include a symbol (variable) in the documentation, you should usually export it.

**Keywords: typedoc plugin force include non exported unexported variable symbol member fake export option flag tag mode file exclude inclusion internal external**
