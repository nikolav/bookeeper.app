import { tree } from "../../../util";
import file from "./file";
import edit from "./edit";
import selection from "./selection";
import view from "./view";
import go from "./go";
import run from "./run";
import terminal from "./terminal";
import help from "./help";
//
const rootFile = new tree({ label: "@MenuBar--File" });
const rootEdit = new tree({ label: "@MenuBar--Edit" });
const rootSelection = new tree({ label: "@MenuBar--Selection" });
const rootView = new tree({ label: "@MenuBar--View" });
const rootGo = new tree({ label: "@MenuBar--Go" });
const rootRun = new tree({ label: "@MenuBar--Run" });
const rootTerminal = new tree({ label: "@MenuBar--Terminal" });
const rootHelp = new tree({ label: "@MenuBar--Help" });
//
const middleware = (node, src) =>
  0 < src.children?.length && node.addClass("hasChildren");
//
const menu = {
  file: rootFile.json(file, middleware),
  edit: rootEdit.json(edit, middleware),
  selection: rootSelection.json(selection, middleware),
  view: rootView.json(view, middleware),
  go: rootGo.json(go, middleware),
  run: rootRun.json(run, middleware),
  terminal: rootTerminal.json(terminal, middleware),
  help: rootHelp.json(help, middleware),
};

export default menu;
