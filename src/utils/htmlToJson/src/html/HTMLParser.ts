/**
 * Convert HTML to JSON
 * @author Yousuf Kalim
 */
import { DOMParser } from '@xmldom/xmldom';
import type { JSONContent } from '../types';

/**
 * Converts HTML Element or string to JSON
 * @param element The HTML string or element to convert to JSON.
 * @param json A boolean to indicate if the output should be a JSON string.
 * @returns {Promise<JSONContent | string>}
 */
async function HTMLParser(element: Element | string, json = false): Promise<JSONContent | string> {
  return await new Promise((resolve, reject) => {
    try {
      const treeObject: any = {};
      let elementToParse: Element = undefined as unknown as Element;

      // If string convert to document Node
      if (typeof element === 'string') {
        const parser = new DOMParser();
        const docNode = parser.parseFromString(element, 'text/xml');
        if (docNode.firstChild) {
          elementToParse = docNode.firstChild as Element;
        }
      } else {
        elementToParse = element;
      }

      // Recursively loop through DOM elements and assign properties to object
      const treeHTML = (element: Element, object = treeObject): void => {
        object.element = element.nodeName;
        const nodeList = element.childNodes;
        if (nodeList !== null) {
          if (nodeList.length) {
            object.children = [];
            for (let i = 0; i < nodeList.length; i++) {
              if (nodeList[i].nodeType === 3) {
                if (nodeList[i].nodeValue) {
                  object.children.push(nodeList[i].nodeValue);
                }
              } else {
                object.children.push({});
                treeHTML(nodeList[i] as Element, object.children[object.children.length - 1]);
              }
            }
          }
        }
        if (element.attributes !== null) {
          if (element.attributes.length) {
            object.attributes = {};
            for (let i = 0; i < element.attributes.length; i++) {
              object.attributes[element.attributes[i].nodeName] = element.attributes[i].nodeValue;
            }
          }
        }
      };

      treeHTML(elementToParse);

      resolve(json ? JSON.stringify(treeObject) : treeObject);
    } catch (e) {
      reject(e);
    }
  });
}

export default HTMLParser;
