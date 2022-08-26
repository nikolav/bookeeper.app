/** @jsxImportSource @emotion/react */
import { useState, forwardRef, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { isNumeric, noop } from "../../util";
import { Popper } from "../index";
import { useAppData } from "../../app/store";
import { useClickAway, useStateSwitch, useWindowAddEvents } from "../../hooks";
import { useMenuBar } from "./MenuBar";
//
const styleMenuEntry = ({ px }) => css`
  list-style: none;
  margin: 0;
  padding: 0;
  padding-left: ${isNumeric(px) ? px + "px" : px};
  padding-right: ${isNumeric(px) ? px + "px" : px};
  /* @hover */
  &:hover {
  }
  border: 1px dotted gray;
`;
const stylePanelRoot = css`
  background-color: white;
  border: 1px dotted gray;
  margin: 0;
  padding: 0;
`;
const styleMenuList = css`
  list-style: none;
  margin: 0;
  padding: 0;
  min-width: 192px;
`;
const styleMenuItem = css`
  list-style: none;
  margin: 0;
  padding: 0;
  &:hover {
  }
`;
//
//
const PanelRoot = styled.div`
  ${stylePanelRoot}
`;
const Entry = styled.li`
  ${styleMenuEntry}
`;
const MenuList = styled.ul`
  ${styleMenuList}
`;
const MenuItem = styled.li`
  ${styleMenuItem}
`;

const MenuBarEntry = forwardRef(
  (
    {
      //
      label,
      //
      px = ".5rem",
      //
      onClick = noop,
      //
      onEnter = noop,
      //
    },
    ref
  ) => {
    return (
      <Entry ref={ref} px={px} onClick={onClick} onMouseOver={onEnter}>
        {label}
      </Entry>
    );
  }
);

const MenuBarSection = ({ node, menuOffset }) => {
  const { ID, isOpenMenuBar } = useMenuBar();
  //
  const { label } = node.value();
  const sectionID = `${ID}--${label}`;
  //
  const appdata = useAppData();
  const menuData = appdata(ID);
  const { openMenuID } = menuData;
  //
  const isOpen = sectionID === openMenuID;
  const closeMenu = () => appdata.set(ID, { ...menuData, openMenuID: null });
  const openMenu = () =>
    appdata.set(ID, { ...menuData, openMenuID: sectionID });
  const toggleMenu = () => (isOpen ? closeMenu() : openMenu());
  const toggleMenuAsync = () => setTimeout(toggleMenu);
  //
  const onEnter = () => isOpenMenuBar && openMenu();
  const [refPopper, setRefPopper] = useState();
  //
  const refPanelRoot = useRef();
  useClickAway(refPanelRoot, closeMenu, isOpen);
  //
  useWindowAddEvents(
    "keyup",
    ({ keyCode }) => 27 === keyCode && closeMenu(),
    isOpenMenuBar
  );
  //
  return (
    <>
      <MenuBarEntry
        onEnter={onEnter}
        onClick={toggleMenuAsync}
        ref={setRefPopper}
        label={label}
      />
      <Popper.Appear
        anchor={refPopper}
        placement="bottom-start"
        isActive={isOpen}
        offset={menuOffset}
      >
        <PanelRoot ref={refPanelRoot}>
          <SubMenuList parent={node} />
        </PanelRoot>
      </Popper.Appear>
    </>
  );
};

export default MenuBarSection;

//
function SubMenuList({ parent }) {
  const { isActive: isInMenuList, toggle: toggleIsInMenuList } =
    useStateSwitch();
  //
  return (
    <MenuList
      onMouseEnter={toggleIsInMenuList.on}
      onMouseLeave={toggleIsInMenuList.off}
    >
      {parent.ls().map((node) => {
        const { label, divider } = node.value();
        const isParent = node.hasClass("hasChildren");
        const isDivider = true === divider;
        //
        return isDivider ? null : isParent ? (
          <SubMenuItem key={label} parent={node} isInMenuList={isInMenuList} />
        ) : (
          <MenuItem key={label}>{label}</MenuItem>
        );
      })}
    </MenuList>
  );
}

function SubMenuItem({ parent, isInMenuList }) {
  const { menuOffsetSecondary, isOpenMenuBar, timeout } =
    useMenuBar();
  //
  const { isActive: isOpen, toggle: toggleIsOpen } = useStateSwitch();
  const { isActive, toggle } = useStateSwitch();
  const [refMenuItem, setRefMenuItem] = useState();
  //
  const [i1$, seti1] = useState();
  const [i2$, seti2] = useState();
  const { isActive: isInSubmenu, toggle: toggleIsInSubmenu } = useStateSwitch();
  //
  const { label } = parent.value();

  useEffect(() => {
    if (!isOpenMenuBar) toggleIsOpen.off();
  }, [isOpenMenuBar]);
  //
  useEffect(() => {
    isOpen &&
      !isActive &&
      isInMenuList &&
      !isInSubmenu &&
      seti2(setTimeout(toggleIsOpen.off, timeout));
  }, [isInMenuList, isInSubmenu]);
  //
  return (
    <MenuItem
      ref={setRefMenuItem}
      onMouseEnter={() => {
        clearInterval(i2$);
        toggle.on();
        seti1(setTimeout(toggleIsOpen.on, timeout));
      }}
      onMouseLeave={() => {
        clearInterval(i1$);
        toggle.off();
        !isInSubmenu && seti2(setTimeout(toggleIsOpen.off, timeout));
      }}
    >
      {label}...
      <Popper.Appear
        anchor={refMenuItem}
        placement="right-start"
        offset={menuOffsetSecondary}
        isActive={isOpen}
      >
        <PanelRoot
          onMouseEnter={toggleIsInSubmenu.on}
          onMouseLeave={toggleIsInSubmenu.off}
        >
          <SubMenuList parent={parent} />
        </PanelRoot>
      </Popper.Appear>
    </MenuItem>
  );
}
