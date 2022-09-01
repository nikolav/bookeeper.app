import { toast } from "react-toastify";
import main from "./main";
import { COMMAND__NEW_TEXT_FILE, COMMAND__NEW_FILE } from "./main/file";
import {
  COMMAND__PANEL_POSITION_BOTTOM,
  COMMAND__PANEL_POSITION_LEFT,
  COMMAND__PANEL_POSITION_RIGHT,
} from "./main/view";
const COMMAND__DEFAULT = "COMMAND__DEFAULT.faegplhmihy";

const configure = (emitter) => {
  [
    COMMAND__DEFAULT,
    COMMAND__NEW_TEXT_FILE,
    COMMAND__NEW_FILE,
    COMMAND__PANEL_POSITION_BOTTOM,
    COMMAND__PANEL_POSITION_LEFT,
    COMMAND__PANEL_POSITION_RIGHT,
  ].forEach((command) =>
    emitter.addEventListener(command, ({ node, commit }) => {
      const { label, isActive, group } = node.value();
      // @demo handler
      setTimeout(() => {
        toast.info(`@demo | running [${label}]`);
      });
    })
  );
};

//
export { configure, main, COMMAND__DEFAULT };
