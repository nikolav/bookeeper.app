import { forEach } from "./index";
//
export const isFolder = (node) => 0 < Object(node).children?.length;
//
export default function traverseTree(node, callback, context = null) {
  if (isFolder(node)) forEach(node.children, traverser_, { callback, context });
  //
  return node;
}
//
function traverser_(node, index, coll) {
  this.callback.call(this.context, node, index, coll);
  traverseTree(node, this.callback, this.context);
}
