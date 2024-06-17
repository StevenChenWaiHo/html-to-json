import { expect, test } from '@jest/globals';
import { HTMLToJSON, JSONToHTML } from '../src';

test('Test the parser by converting HTML to JSON', async () => {
  const element = '<div><ul><li>Hello <strong>World</strong></li></ul></div>';
  const result = await HTMLToJSON(element, true);

  const expected =
    '{"element":"div","children":[{"element":"ul","children":[{"element":"li","children":["Hello ",{"element":"strong","children":["World"]}]}]}]}';
  expect(result).toMatch(expected);
});

test('Test the Pugpig Definition', async () => {
  const element = '<div class="bg-red-500"><span>Hello</span></div>';
  const resultObject = await HTMLToJSON(element, false);

  const expected =
  `
    {
      "element": "div",
      "attributes": {
        "class": "bg-red-500"
      },
      "children": [
        {
          "element": "span",
          "children": ["Hello"]
        }
      ]
    }
  `;

  const expectObject = JSON.parse(expected)

  expect(resultObject).toMatchObject(expectObject)
});

test('Test the parser by converting JSON to HTML', async () => {
  const element =
    '{"element":"div","children":[{"element":"ul","children":[{"element":"li","children":["Hello ",{"element":"strong","children":["World"]}]}]}]}';
  const result = await JSONToHTML(element, true);

  const expected = '<div><ul><li>Hello <strong>World</strong></li></ul></div>';

  expect(result).toMatch(expected);
});
