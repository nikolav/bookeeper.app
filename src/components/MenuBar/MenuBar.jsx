/** @jsxImportSource @emotion/react */
import { useRef, useEffect, createContext, useContext } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useAppData } from "../../app/store";
import { useHover } from "../../hooks";
import MenuBarSection from "./MenuBarSection";
import { main as menubar } from "../../assets/menu";
//
const styleMenuBar__topBar = css`
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: end;
  font-size: 92%;
  /* border-bottom: 1px dotted gray; */
`;
const styleMenuBar__topBar__onHover = css``;

//
const Widget = styled.ul`
  ${styleMenuBar__topBar}
`;
//
const ContextMenuBar = createContext();
export const useMenuBar = () => useContext(ContextMenuBar);
////
////
const MenuBar = ({
  // tree{} menu entries
  menu = menubar,
  //
  ID = "@MenuBar-1",
  //
  menuOffset = [0, 0],
  //
  menuOffsetSecondary = [0, -2],
  //
  timeout = 292,
  //
  effect = "slideUp",
  //
  iconWidth = "1.22rem",
  //
  ...rest
}) => {
  //
  const refWidget = useRef();
  const isHoverWidget = useHover(refWidget);
  //
  const appdata = useAppData();
  if (!appdata.has(ID)) appdata.set(ID, { openMenuID: null });
  //
  const menuData = appdata(ID);
  const isOpenMenuBar = null != menuData?.openMenuID;
  //
  const provide = {
    ID,
    menuOffsetSecondary,
    isOpenMenuBar,
    timeout,
    effect,
    iconWidth,
  };
  //
  return (
    <ContextMenuBar.Provider value={provide}>
      <Widget
        ref={refWidget}
        css={[isHoverWidget && styleMenuBar__topBar__onHover]}
        {...rest}
      >
        {Object.keys(menu).map((menuKey) => (
          <MenuBarSection
            key={menuKey}
            node={menu[menuKey].first()}
            menuOffset={menuOffset}
          />
        ))}
      </Widget>
    </ContextMenuBar.Provider>
  );
};

export default MenuBar;
