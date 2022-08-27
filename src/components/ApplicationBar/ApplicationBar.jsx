/** @jsxImportSource @emotion/react */
import { createContext, useContext } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useAppData } from "../../app/store";
import ApplicationBarSection from "./ApplicationBarSection";
import { main as menubar } from "../../assets/menu";
//
const styleTopBar = css`
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: end;
  user-select: none;
  margin: 0;
  padding: 0;
  font-size: 92%;
`;
//
const ApplicationBarMenu = styled.ul`
  ${styleTopBar}
`;
//
const ContextApplicationBar = createContext();
export const useAppBar = () => useContext(ContextApplicationBar);
////
////
const ApplicationBar = ({
  // tree{} menu entries
  menu = menubar,
  //
  ID = "@ApplicationBar-unaxbqyyync",
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
  const appdata = useAppData();
  if (!appdata.has(ID)) appdata.set(ID, { openMenuID: null });
  //
  const data = appdata(ID);
  const isOpenAppBar = null != data?.openMenuID;
  // 
  const provide = {
    ID,
    menuOffsetSecondary,
    isOpenAppBar,
    timeout,
    effect,
    iconWidth,
  };
  //
  return (
    <ContextApplicationBar.Provider value={provide}>
      <ApplicationBarMenu {...rest}>
        {Object.keys(menu).map((menuKey) => (
          <ApplicationBarSection
            key={menuKey}
            node={menu[menuKey].first()}
            menuOffset={menuOffset}
          />
        ))}
      </ApplicationBarMenu>
    </ContextApplicationBar.Provider>
  );
};

export default ApplicationBar;
