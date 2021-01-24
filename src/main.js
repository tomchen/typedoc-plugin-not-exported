/**
 * typedoc-plugin-not-exported
 * TypeDoc plugin that forces inclusion of non-exported symbols (variables)
 * Originally from https://github.com/TypeStrong/typedoc/issues/1474#issuecomment-766178261
 * https://github.com/tomchen/typedoc-plugin-not-exported
 * CC0
 */

//@ts-check

const { Converter, TypeScript } = require('typedoc') // version 0.20.16+

const ModuleFlags =
  TypeScript.SymbolFlags.ValueModule | TypeScript.SymbolFlags.NamespaceModule

/** @param {{ application: import("typedoc").Application }} param0 */
exports.load = function ({ application }) {
  let includeTag = 'notExported'

  application.options.addDeclaration({
    name: 'includeTag',
    help:
      '[typedoc-plugin-not-exported] Specify the tag name for non-exported member to be imported under',
    defaultValue: includeTag,
  })

  application.converter.on(Converter.EVENT_BEGIN, () => {
    includeTag = application.options.getValue('includeTag').toLocaleLowerCase()
  })

  application.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    lookForFakeExports
  )

  /**
   * @param {import("typedoc/dist/lib/converter/context").Context} context
   * @param {import("typedoc").DeclarationReflection} _reflection
   * @param {TypeScript.Node | undefined} node
   */
  function lookForFakeExports(context, _reflection, node) {
    if (!node) {
      return
    }

    /** @type {TypeScript.Symbol | undefined} */
    const moduleSymbolTemp = context.checker.getSymbolAtLocation(node)
    const moduleSymbol =
      moduleSymbolTemp !== null && moduleSymbolTemp !== undefined
        ? moduleSymbolTemp
        : /** @type {any} */ node.symbol

    if (!moduleSymbol) {
      // Global file, no point in doing anything here. TypeDoc will already
      // include everything declared in this file.
      return
    }

    // Make sure we are allowed to call getExportsOfModule
    if ((moduleSymbol.flags & ModuleFlags) === 0) {
      return
    }

    const exportedSymbols = context.checker.getExportsOfModule(moduleSymbol)

    const symbols = context.checker
      .getSymbolsInScope(node, TypeScript.SymbolFlags.ModuleMember)
      .filter((symbol) => !exportedSymbols.includes(symbol))

    for (const symbol of symbols) {
      if (
        symbol
          .getJsDocTags()
          .some((tag) => tag.name.toLocaleLowerCase() === includeTag)
      ) {
        context.converter.convertSymbol(context, symbol)
      }
    }
  }
}
