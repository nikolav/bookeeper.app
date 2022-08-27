/** @jsxImportSource @emotion/react */
import { useState, useRef } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Popper } from "../index";
import { useAppData } from "../../app/store";
import { useClickAway, useWindowAddEvents } from "../../hooks";
import { useAppBar } from "./ApplicationBar";
import ApplicationBarEntry from "./ApplicationBarEntry";
import SubMenuList from "./SubMenuList";
//
const stylePanelRoot = css`
  background-color: white;
  border-radius: 3px;
  overflow-y: auto;
  font-size: 82%;
  margin: 0;
  padding: 0;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;
export const PanelRoot = styled.div`
  ${stylePanelRoot}
`;
//
const ApplicationBarSection = ({ node, menuOffset }) => {
  const { icon, label } = node.value();
  //
  const { ID, isOpenAppBar } = useAppBar();
  const appdata = useAppData();
  const menuData = appdata(ID);
  const { openMenuID } = menuData;
  const sectionID = `${ID}--${label}`;
  //
  const isOpen = sectionID === openMenuID;
  const closeMenu = () => appdata.set(ID, { ...menuData, openMenuID: null });
  const openMenu = () =>
    appdata.set(ID, { ...menuData, openMenuID: sectionID });
  const toggleMenu = () => (isOpen ? closeMenu() : openMenu());
  const toggleMenuAsync = () => setTimeout(toggleMenu);
  //
  const onEnter = () => isOpenAppBar && openMenu();
  const [refPopper, setRefPopper] = useState();
  //
  const refPanelRoot = useRef();
  useClickAway(refPanelRoot, closeMenu, isOpen);
  //
  useWindowAddEvents(
    "keyup",
    ({ keyCode }) => 27 === keyCode && closeMenu(),
    isOpenAppBar
  );
  //
  return (
    <>
      <ApplicationBarEntry
        onEnter={onEnter}
        onClick={toggleMenuAsync}
        ref={setRefPopper}
        icon={icon}
        label={label}
      />
      <Popper
        isActive={isOpen}
        anchor={refPopper}
        placement="bottom-start"
        offset={menuOffset}
      >
        <PanelRoot ref={refPanelRoot}>
          <SubMenuList parent={node} />
        </PanelRoot>
      </Popper>
    </>
  );
};

export default ApplicationBarSection;
