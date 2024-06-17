/**
 * Convert JSON to HTML
 * @author Yousuf Kalim
 */
import { DOMParser } from '@xmldom/xmldom';
import { JSONContent } from '../types';

/**
 * Converts JSON content to HTML string or HTML Document object
 * @param children The JSON or JS object to convert to HTML Element/String
 * @param string A boolean to indicate if the output should be an HTML Element or String.
 * @returns {Promise<string | Document>}
 */
async function JSONToHTML(
  children: JSONContent | string,
  string = true, // default to returning a string representation
): Promise<string | Document> {
  return await new Promise((resolve, reject) => {
    try {
      let jsonContent = children;

      // If input is a string, parse it as JSON
      if (typeof children === 'string') {
        jsonContent = JSON.parse(children) as JSONContent;
      }

      // Recursively construct HTML string from JSON content
      const treeJSON = (content: JSONContent): string => {
        let html = `<${content.element}`; // Start with opening tag

        // If there are attributes, add them to the tag
        if (content.attributes) {
          Object.entries(content.attributes).forEach(([attribute, value]) => {
            html += ` ${attribute}="${value as string}"`;
          });
        }
        html += '>';

        // If there is content, process it and add it to the tag
        if (content.children) {
          content.children.forEach((node) => {
            if (typeof node === 'string') {
              html += node;
            } else {
              html += treeJSON(node);
            }
          });
        }

        // End the tag
        html += `</${content.element}>`;

        return html;
      };

      // Convert the JSON content to HTML string
      const html = treeJSON(jsonContent as JSONContent);

      // If string flag is set, return the HTML string
      if (string) {
        resolve(html);
      } else {
        // Otherwise, parse the HTML string to an Element
        const parser = new DOMParser();
        resolve(parser.parseFromString(html, 'text/xml'));
      }
    } catch (e) {
      // Reject the Promise if there's an error
      reject(e);
    }
  });
}

export default JSONToHTML;
