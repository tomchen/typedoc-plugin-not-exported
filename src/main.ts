/**
 * typedoc-plugin-not-exported
 * TypeDoc plugin that forces inclusion of non-exported symbols (variables)
 * Originally from https://github.com/TypeStrong/typedoc/issues/1474#issuecomment-766178261
 * https://github.com/tomchen/typedoc-plugin-not-exported
 * CC0
 */

import {
  Converter,
  TypeScript,
  Application,
  DeclarationReflection,
} from 'typedoc' // version 0.20.16+
import { Context } from 'typedoc/dist/lib/converter/context' // version 0.20.16+

const ModuleFlags =
  TypeScript.SymbolFlags.ValueModule | TypeScript.SymbolFlags.NamespaceModule

exports.load = function ({ application }: { application: Application }) {
  let includeTag = 'notExported'

  application.options.addDeclaration({
    name: 'includeTag',
    help:
      '[typedoc-plugin-not-exported] Specify the tag name for non-exported member to be imported under',
    defaultValue: includeTag,
  })

  application.converter.on(Converter.EVENT_BEGIN, () => {
    const includeTagTemp = application.options.getValue('includeTag')
    if (typeof includeTagTemp === 'string') {
      includeTag = includeTagTemp.toLocaleLowerCase()
    }
  })

  application.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    lookForFakeExports
  )

  function lookForFakeExports(
    context: Context,
    _reflection: DeclarationReflection,
    node: (TypeScript.Node & { symbol?: TypeScript.Symbol }) | undefined
  ) {
    if (!node) {
      return
    }

    const moduleSymbol: TypeScript.Symbol | undefined =
      context.checker.getSymbolAtLocation(node) ?? node.symbol

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
