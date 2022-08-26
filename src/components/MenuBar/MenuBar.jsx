/** @jsxImportSource @emotion/react */
import React, { Fragment } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Popper } from "../index";
import { useAppData, useFlags, FLAG_MENU_OPEN } from "../../app/store";
import { MdChevronRight as IconChevron } from "../icons";
//
import MenuBarEntry from "./MenuBarEntry";
import MenuBarCommand from "./MenuBarCommand";
import MenuBarPanel from "./MenuBarPanel";
//
import { main as menubar } from "../../assets/menu";
import { keys, map } from "../../util";

//
const styleMenuBar__topBar = css`
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

//
const Widget = styled.ul`
  ${styleMenuBar__topBar}
`;
////
////
const MenuBar = ({
  // tree{} menu entries
  menu = menubar,
  // add classes @root
  className = "",
  // open menu entries if menu bar is open @hover-on-other-entry
  hoverOpen = true,
  //
  ...rest
}) => {
  //
  const flags = useFlags();
  const appdata = useAppData();
  //
  const isMenuOpen = flags(FLAG_MENU_OPEN);
  //
  return (
    <Widget>
      {map(keys(menu), (menuKey) => {
        const node = menu[menuKey].eq(0);
        //
        return (
          <Fragment key={menuKey}>
            <MenuBarEntry node={node} />
            <MenuBarPanel node={node} />
          </Fragment>
        );
      })}
    </Widget>
  );
};

export default MenuBar;
