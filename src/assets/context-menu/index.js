import { toast } from "react-toastify";
//
const COMMAND__CONTEXT_MENU__DEFAULT =
  "COMMAND__CONTEXT_MENU__DEFAULT.zijjxshbbxn";
//
const configure = (emitter) => {
  [COMMAND__CONTEXT_MENU__DEFAULT].forEach((command) =>
    emitter.addEventListener(command, ({ node, commit }) => {
      const { label, isActive, group } = node.value();
      // @demo
      //   contextMenu command handler
      setTimeout(() => {
        toast.info(`@contextmenu.demo | running [${label}]`);
      });
    })
  );
};
//
export { configure, COMMAND__CONTEXT_MENU__DEFAULT };
