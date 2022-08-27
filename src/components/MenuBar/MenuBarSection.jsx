/** @jsxImportSource @emotion/react */
import { useState, forwardRef, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { isNumeric, noop } from "../../util";
import { Popper } from "../index";
import { useAppData } from "../../app/store";
import { useClickAway, useStateSwitch, useWindowAddEvents } from "../../hooks";
import { useMenuBar } from "./MenuBar";
import { MdChevronRight as IconChevronRight } from "../icons";
//
const styleMenuEntry = ({ px }) => css`
  list-style: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  padding-left: ${isNumeric(px) ? px + "px" : px};
  padding-right: ${isNumeric(px) ? px + "px" : px};
  /* @hover */
  opacity: 0.72;
  &:hover {
    opacity: 1;
  }
  /* border: 1px dotted gray; */
`;
const stylePanelRoot = css`
  background-color: white;
  border-radius: 3px;
  overflow-y: auto;
  font-size: 82%;
  /* border: 1px dotted gray; */
  margin: 0;
  padding: 0;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;
const styleMenuList = css`
  list-style: none;
  margin: 0;
  padding: 0;
  min-width: 192px;
`;
const styleMenuItem = ({ isDisabled }) => css`
  list-style: none;
  margin: 0;
  padding: 0.1rem 0.33rem;
  user-select: none;
  cursor: ${!isDisabled && "pointer"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: ${isDisabled && 0.33};
  &:hover {
    background-color: ${!isDisabled && "rgba(0, 0, 0, 0.048)"};
  }
  &:first-of-type {
    padding-top: 0.25rem;
  }
  &:last-child {
    padding-bottom: 0.33rem;
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
      icon = null,
      //
      label,
      //
      px = ".5rem",
      //
      onClick = noop,
      //
      onEnter = noop,
      //
      ...rest
    },
    ref
  ) => {
    return (
      <Entry
        ref={ref}
        px={px}
        onClick={onClick}
        onMouseOver={onEnter}
        {...rest}
      >
        {icon && <strong className="MenuBar--icon">{icon}</strong>}
        {label}
      </Entry>
    );
  }
);

const MenuItemSingle = forwardRef(
  (
    {
      icon,
      label,
      iconWidth,
      shortcut,
      isSubMenu,
      isDisabled,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <MenuItem ref={ref} isDisabled={isDisabled} {...rest}>
        <span className="flex items-center">
          <span style={{ width: iconWidth }} className="MenuBar-SubMenu--icon">
            {icon}
          </span>
          <span className="mr-8">{label}</span>
        </span>
        <span className="flex items-center">
          <span className="MenuBar-SubMenu--icon">{shortcut}</span>
          <span style={{ width: iconWidth }} className="MenuBar-SubMenu--icon">
            {isSubMenu && <IconChevronRight style={{ fontSize: 22 }} />}
          </span>
        </span>
        {children}
      </MenuItem>
    );
  }
);

const MenuBarSection = ({ node, menuOffset }) => {
  const { icon, label } = node.value();
  //
  const { ID, isOpenMenuBar } = useMenuBar();
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

export default MenuBarSection;

//
function SubMenuList({ parent }) {
  const { iconWidth } = useMenuBar();
  const { isActive: isInMenuList, toggle: toggleIsInMenuList } =
    useStateSwitch();
  //
  return (
    <MenuList
      onMouseEnter={toggleIsInMenuList.on}
      onMouseLeave={toggleIsInMenuList.off}
    >
      {parent.ls().map((node, index) => {
        const { icon, label, shortcut, divider, disabled } = node.value();
        const isParent = node.hasClass("hasChildren");
        const isDivider = true === divider;
        const isDisabled = true === disabled;
        //
        return isDivider ? (
          <Divider key={`divider-${index}`} />
        ) : isParent ? (
          <SubMenuItem key={label} parent={node} isInMenuList={isInMenuList} />
        ) : (
          <MenuItemSingle
            key={label}
            icon={icon}
            label={label}
            iconWidth={iconWidth}
            shortcut={shortcut}
            isDisabled={isDisabled}
          />
        );
      })}
    </MenuList>
  );
}

function SubMenuItem({ parent, isInMenuList }) {
  const { menuOffsetSecondary, isOpenMenuBar, timeout, effect, iconWidth } =
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
  const { icon, label, shortcut, disabled } = parent.value();
  const isDisabled = true === disabled;

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
    <MenuItemSingle
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
      icon={icon}
      label={label}
      iconWidth={iconWidth}
      shortcut={shortcut}
      isSubMenu={true}
      isDisabled={isDisabled}
    >
      <Popper.Appear
        isActive={isOpen}
        anchor={refMenuItem}
        placement="right-start"
        offset={menuOffsetSecondary}
        effect={effect}
      >
        <PanelRoot
          onMouseEnter={toggleIsInSubmenu.on}
          onMouseLeave={toggleIsInSubmenu.off}
        >
          <SubMenuList parent={parent} />
        </PanelRoot>
      </Popper.Appear>
    </MenuItemSingle>
  );
}

function Divider() {
  return <hr className="m-0 p-0 my-1 block border-stone-300" />;
}
