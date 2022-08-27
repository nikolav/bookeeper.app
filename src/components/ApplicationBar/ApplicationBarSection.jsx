/** @jsxImportSource @emotion/react */
import { useState, useRef } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import ApplicationBarEntry from "./ApplicationBarEntry";
import SubMenuList from "./SubMenuList";
import { Popper } from "../index";
import { useAppData } from "../../app/store";
import { useClickAway, useWindowAddEvents } from "../../hooks";
import { useAppBar } from "./ApplicationBar";
//
const stylePanel = css`
  background-color: white;
  border-radius: 3px;
  overflow-y: auto;
  font-size: 82%;
  margin: 0;
  padding: 0;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;
export const Panel = styled.div`
  ${stylePanel}
`;
//
const ApplicationBarSection = ({ node, menuOffset }) => {
  const { label } = node.value();
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
  const refPanel = useRef();
  useClickAway(refPanel, closeMenu, isOpen);
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
        node={node}
      />
      <Popper
        isActive={isOpen}
        anchor={refPopper}
        placement="bottom-start"
        offset={menuOffset}
      >
        <Panel ref={refPanel}>
          <SubMenuList parent={node} />
        </Panel>
      </Popper>
    </>
  );
};

export default ApplicationBarSection;
