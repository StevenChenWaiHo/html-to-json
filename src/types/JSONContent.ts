/**
 * JSONContent Interface
 * @author Yousuf Kalim
 */
export default interface JSONContent {
  element: string;
  attributes?: object;
  children: Array<string | JSONContent>;
}
