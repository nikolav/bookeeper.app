import { tree } from "../../../util";
import file from "./file";
import edit from "./edit";
import selection from "./selection";
import view from "./view";
//
const rootFile = new tree({ label: "@MenuBar--File" });
const rootEdit = new tree({ label: "@MenuBar--Edit" });
const rootSelection = new tree({ label: "@MenuBar--Selection" });
const rootView = new tree({ label: "@MenuBar--View" });
//
const middleware = (node, src) =>
  0 < src.children?.length && node.addClass("hasChildren");
//
const menu = {
  file: rootFile.json(file, middleware),
  edit: rootEdit.json(edit, middleware),
  selection: rootSelection.json(selection, middleware),
  view: rootView.json(view, middleware),
};

export default menu;
