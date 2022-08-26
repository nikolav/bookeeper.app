import { tree } from "../../../util";
import file from "./file";
import edit from "./edit";
import help from "./help";
//
const rootFile = new tree({ label: "@MenuBar--File" });
const rootEdit = new tree({ label: "@MenuBar--Edit" });
const rootHelp = new tree({ label: "@MenuBar--Help" });
//
const middleware = (node, src) =>
  0 < src.children?.length && node.addClass("hasChildren");
//
const menu = {
  file: rootFile.json(file, middleware),
  edit: rootEdit.json(edit, middleware),
  help: rootHelp.json(help, middleware),
};

export default menu;
