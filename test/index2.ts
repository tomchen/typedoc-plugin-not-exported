/**
 * @internalDoNotUse
 */
type twoNumbers = [number, number]
/**
 * @internalDoNotUse
 */
type threeNumbers = [number, number, number]

type fourNumbers = [number, number, number, number]

export type twoOrThreeNumbers = twoNumbers | threeNumbers

export function sum2(ns: twoOrThreeNumbers): number {
  return ns.reduce((a, b) => a + b)
}

/**
 * My class
 * @internalDoNotUse
 */
class Cls {
  convert(str: string): string {
    return str
  }
}

class HiddenCls {
  convert(str: string): string {
    return str
  }
}

export const me = new Cls()
