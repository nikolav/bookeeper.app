/** @jsxImportSource @emotion/react */
import { useState, useRef } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import ApplicationBarEntry from "./ApplicationBarEntry";
import SubMenuList from "./SubMenuList";
import { Popper } from "../index";
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
  //
  const { ID, isOpenAppBar, openMenu, closeMenu, isOpen, toggleMenu } =
    useAppBar();
  const { label } = node.value();

  const sectionID = `${ID}--${label}`;
  const isOpenSection = isOpen(sectionID);
  const toggleMenuAsync = () => setTimeout(() => toggleMenu(sectionID));
  const onEnter = () => isOpenAppBar && openMenu(sectionID);
  //
  const [refPopper, setRefPopper] = useState();
  //
  const refPanel = useRef();
  useClickAway(refPanel, closeMenu, isOpenSection);
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
        isActive={isOpenSection}
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
