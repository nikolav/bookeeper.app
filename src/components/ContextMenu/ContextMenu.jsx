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
  anchor,
  //
  menu,
  //
  ID = "@ContextMenu--eeqtllvzybc",
  //
  iconWidth = "1.67rem",
  //
  gapLabelShortuct = "4.5rem",
  //
  menuOffsetSecondary = [-2, -5],
  //
  timeout = 234,
  //
  effect = "slideUpExitPop",
  //
  ...rest
}) => {
  const r$ = useRef();
  const [clientRect$, setClientRect] = useState();
  const { isActive: isOpen, toggle: toggleIsOpen } = useStateSwitch();
  const closeMenu = toggleIsOpen.off;
  //
  const [k$, setk] = useState();
  const commit = () => setk(idGen());
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
  // callback stack for closing last open submenu
  // stack onClose callbacks when submenu opens
  // run/pop stack @esc
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
  useClickAway(r$, toggleIsOpen.off, isOpen);
  useWindowAddEvents(
    "keyup",
    ({ keyCode }) => 27 === keyCode && setEsc(idGen()),
    isOpen
  );
  //
  const provide = {
    iconWidth,
    gapLabelShortuct,
    commit,
    closeMenu,
    menuOffsetSecondary,
    timeout,
    effect,
    //
    pushStackESC,
    popStackESC,
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
