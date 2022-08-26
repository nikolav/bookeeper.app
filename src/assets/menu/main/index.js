import { tree } from "../../../util";
import file from "./file";
import edit from "./edit";
import help from "./help";
//
const rootFile = new tree("@MenuBar--File");
const rootEdit = new tree("@MenuBar--Edit");
const rootHelp = new tree("@MenuBar--Help");
//
const menu = {
  file: rootFile.json(file),
  edit: rootEdit.json(edit),
  help: rootHelp.json(help),
};

export default menu;
