/** @jsxImportSource @emotion/react */
import { createContext, useContext } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import ApplicationBarSection from "./ApplicationBarSection";
import { useAppData } from "../../app/store";
import { useWindowAddEvents } from "../../hooks";
import { main as menubar } from "../../assets/menu";
import { idGen } from "../../util";
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
  // use menu data{} provided under global ID key
  const appdata = useAppData();
  if (!appdata.has(ID))
    appdata.set(ID, {
      openMenuID: null,
      _keyCommit: null,
    });
  const data = appdata(ID);
  //
  // setup menu controlls
  const isOpenAppBar = null != data?.openMenuID;
  const openMenu = (sectionID) =>
    appdata.set(ID, { ...data, openMenuID: sectionID });
  const closeMenu = () => openMenu(null);
  const isOpen = (sectionID) => sectionID === data?.openMenuID;
  const toggleMenu = (sectionID) =>
    isOpen(sectionID) ? closeMenu() : openMenu(sectionID);
  //
  // menu regenerate method
  // menu tree{} is outside react lifecycle
  // ..manually trigger menu jsx rebuild with .commit()
  const commit = () => appdata.set(ID, { ...data, _keyCommit: idGen() });
  //
  // provide to descendant components
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
    openMenu,
    closeMenu,
    isOpen,
    toggleMenu,
    //
    commit,
  };
  //
  // listen @key.ESC
  useWindowAddEvents(
    "keyup",
    ({ keyCode }) => 27 === keyCode && closeMenu(),
    isOpenAppBar
  );
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
