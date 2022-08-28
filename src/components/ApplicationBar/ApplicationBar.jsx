/** @jsxImportSource @emotion/react */
import { createContext, useContext } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import ApplicationBarSection from "./ApplicationBarSection";
import { useAppData } from "../../app/store";
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
  menuOffsetSecondary = [0, -4],
  //
  iconWidth = "1.25rem",
  //
  gapLabelShortuct = "3.6rem",
  //
  timeout = 292,
  //
  effect = "slideUp",
  //
  ...rest
}) => {
  //
  const appdata = useAppData();
  if (!appdata.has(ID)) appdata.set(ID, { openMenuID: null, updatedAt: null });
  //
  const data = appdata(ID);
  const isOpenAppBar = null != data?.openMenuID;
  //
  // since menu data is outside react lifecycle, rebuild menu manually with .commit()
  const commit = () => appdata.set(ID, { ...data, updatedAt: Date.now() });
  //
  const provide = {
    ID,
    menuOffsetSecondary,
    isOpenAppBar,
    timeout,
    effect,
    iconWidth,
    gapLabelShortuct,
    //
    menu,
    commit,
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
