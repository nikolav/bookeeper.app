/** @jsxImportSource @emotion/react */
import { useRef, useEffect, createContext, useContext } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useAppData } from "../../app/store";
// import { MdChevronRight as IconChevron } from "../icons";
import { useHover } from "../../hooks";
//
import MenuBarSection from "./MenuBarSection";
//
import { main as menubar } from "../../assets/menu";
import { keys, map } from "../../util";

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
  // add classes @root
  className = "",
  // open menu entries if menu bar is open @hover-on-other-entry
  hoverOpen = true,
  //
  menuOffset = [0, 0],
  //
  menuOffsetSecondary = [0, -1],
  //
  timeout = 444,
  //
  ...rest
}) => {
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
  };
  //
  return (
    <ContextMenuBar.Provider value={provide}>
      <Widget
        ref={refWidget}
        css={[isHoverWidget && styleMenuBar__topBar__onHover]}
        {...rest}
      >
        {map(keys(menu), (menuKey) => (
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
