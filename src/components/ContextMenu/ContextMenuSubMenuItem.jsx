import { useState, useEffect } from "react";
import { useMenuContext } from "./ContextMenu";
import ContextMenuSubMenuList from "./ContextMenuSubMenuList";
import ContextMenuItemSingle from "./ContextMenuItemSingle";
import ContextMenuPanelSubMenu from "./ContextMenuPanelSubMenu";
import { Popper } from "../index";
import { useStateSwitch } from "../../hooks";
//
const ContextMenuSubMenuItem = ({ parent, isInMenuList }) => {
  const { menuOffsetSecondary, timeout, effect } = useMenuContext();
  //
  const { isActive, toggle } = useStateSwitch();
  const { isActive: isInSubmenu, toggle: toggleIsInSubmenu } = useStateSwitch();
  const { isActive: isOpen, toggle: toggleIsOpen } = useStateSwitch();
  const [refMenuItem, setRefMenuItem] = useState();
  //
  const [i1$, seti1] = useState();
  const [i2$, seti2] = useState();
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
    <ContextMenuItemSingle
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
      node={parent}
    >
      <Popper.Appear
        isActive={isOpen}
        anchor={refMenuItem}
        placement="right-start"
        offset={menuOffsetSecondary}
        effect={effect}
      >
        <ContextMenuPanelSubMenu
          onMouseEnter={toggleIsInSubmenu.on}
          onMouseLeave={toggleIsInSubmenu.off}
          node={parent}
          onClose={toggleIsOpen.off}
        >
          <ContextMenuSubMenuList parent={parent} />
        </ContextMenuPanelSubMenu>
      </Popper.Appear>
    </ContextMenuItemSingle>
  );
};

export default ContextMenuSubMenuItem;
