/** @jsxImportSource @emotion/react */
import { useRef, useEffect, useState, createContext, useContext } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Popper, PortalOverlays } from "../index";
import ContextMenuSubMenuList from "./ContextMenuSubMenuList";
import {
  useStateSwitch,
  useOn,
  useClickAway,
  useWindowAddEvents,
  useStackOnce,
} from "../../hooks";
import { idGen } from "../../util";
//
// provides context data to descendats
const ContextMenuContext = createContext();
export const useMenuContext = () => useContext(ContextMenuContext);
//
const stylePanel = css`
  background-color: white;
  border-radius: 3px;
  overflow-y: auto;
  font-size: 82%;
  margin: 0;
  padding: 0;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  overflow-x: hidden;
`;
const ContextMenuPanel = styled.section`
  ${stylePanel}
`;
//
const ContextMenu = ({
  //
  // bind menu to this ref
  anchor,
  //
  // menu tree{}
  menu,
  //
  // provide string.unique for each menu
  ID = "@ContextMenu--eeqtllvzybc",
  //
  iconWidth = "1.67rem",
  //
  gapLabelShortuct = "4.5rem",
  //
  // offset submenus
  menuOffsetSecondary = [-2, -5],
  //
  timeout = 234,
  //
  // in.slideUp - out.pop
  effect = "slideUpExitPop",
  //
  ...rest
}) => {
  const { isActive: isOpen, toggle: toggleIsOpen } = useStateSwitch();
  const [clientRect$, setClientRect] = useState();
  const r$ = useRef();
  //
  const closeMenu = toggleIsOpen.off;
  //
  // @contextmenu open
  // cache .virtualElement for popperjs; isOpen.on
  useOn(anchor, {
    contextmenu: (e) => {
      //
      // kill default menu
      e.preventDefault();
      //
      // cache client-pos
      const { clientX: x, clientY: y } = e;
      setClientRect({
        x,
        left: x,
        y,
        top: y,
        width: 0,
        height: 0,
      });
      //
      toggleIsOpen.on();
    },
  });
  //
  // callback stack to close last open submenu
  // stack onClose callbacks @submenu.open; pop@esc
  const {
    stack: { isEmpty: isEmptyESC, tail: tailStackESC },
    push: pushStackESC,
    pop: popStackESC,
  } = useStackOnce(({ path }) => path);
  const [esc$, setEsc] = useState();
  //
  useEffect(() => {
    if (isEmptyESC) {
      closeMenu();
      return;
    }
    tailStackESC.onClose();
    popStackESC(tailStackESC);
    //
  }, [esc$]);
  //
  // @clickaway|key.esc close
  useClickAway(r$, closeMenu, isOpen);
  useWindowAddEvents(
    "keyup",
    ({ keyCode }) => 27 === keyCode && setEsc(idGen()),
    isOpen
  );
  //
  const [k$, setk] = useState();
  const commit = () => setk(idGen());
  //
  const provide = {
    closeMenu,
    commit,
    effect,
    gapLabelShortuct,
    iconWidth,
    menuOffsetSecondary,
    timeout,
    //
    popStackESC,
    pushStackESC,
    //
    _keyCommit: k$,
  };
  //
  return (
    <ContextMenuContext.Provider value={provide}>
      <PortalOverlays end={true}>
        <Popper.Appear
          anchor={{ getBoundingClientRect: () => clientRect$ }}
          placement="right-start"
          isActive={isOpen}
          effect={effect}
          offset={[0, 0]}
          {...rest}
        >
          <ContextMenuPanel ref={r$}>
            <ContextMenuSubMenuList parent={menu.first()} />
          </ContextMenuPanel>
        </Popper.Appear>
      </PortalOverlays>
    </ContextMenuContext.Provider>
  );
};
//
export default ContextMenu;
