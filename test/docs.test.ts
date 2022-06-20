import * as cheerio from 'cheerio'
import * as fs from 'fs'
import * as path from 'path'

const indexHtmlPath = path.join(__dirname, "test", "docs", "index.html")
const indexHtml = fs.readFileSync(indexHtmlPath)
const $ = cheerio.load(indexHtml)

test('Cls', () => {
  expect(
    $(
      'body > div.container.container-main > div > div.col-8.col-content > section.tsd-panel-group.tsd-index-group > section > div > section:nth-child(1) > ul > li > a'
    ).text()
  ).toBe('Cls')
})

test('threeNumbers', () => {
  expect(
    $(
      'body > div.container.container-main > div > div.col-8.col-content > section.tsd-panel-group.tsd-index-group > section > div > section:nth-child(2) > ul > li:nth-child(1) > a'
    ).text()
  ).toBe('threeNumbers')
})

test('notexported tag', () => {
  expect(
    $(
      'body > div.container.container-main > div > div.col-8.col-content > section:nth-child(2) > section:nth-child(3) > div.tsd-comment.tsd-typography > dl > dt'
    ).text()
  ).toBe('notexported')
})

/*
test('twonumbers href', () => {
  expect(
    $(
      'body > div.container.container-main > div > div.col-8.col-content > section:nth-child(2) > section:nth-child(4) > div > a:nth-child(4)'
    ).attr('href')
  ).toBe('index.html#twonumbers')
})
*/

test('cls href', () => {
  expect(
    $(
      'body > div.container.container-main > div > div.col-8.col-content > section:nth-child(3) > section > div > a'
    ).attr('href')
  ).toBe('classes/Cls.html')
})

test('class count', () => {
  expect(
    $(
      'body > div.container.container-main > div > div.col-8.col-content > section.tsd-panel-group.tsd-index-group > section > div > section:nth-child(1) > ul > li.tsd-kind-class'
    ).length
  ).toBe(1)
})

test('type count', () => {
  expect(
    $(
      'body > div.container.container-main > div > div.col-8.col-content > section.tsd-panel-group.tsd-index-group > section > div > section:nth-child(2) > ul > li.tsd-kind-type-alias'
    ).length
  ).toBe(3)
})
