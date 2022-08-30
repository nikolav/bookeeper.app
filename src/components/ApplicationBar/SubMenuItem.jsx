import { useState, useEffect } from "react";
import { Popper } from "../index";
import SubMenuList from "./SubMenuList";
import ApplicationBarItemSingle from "./ApplicationBarItemSingle";
import { useStateSwitch } from "../../hooks";
import { useAppBar } from "./ApplicationBar";
import PanelSubMenu from "./PanelSubMenu";
//
export default function SubMenuItem({ parent, isInMenuList }) {
  const { menuOffsetSecondary, isOpenAppBar, timeout, effect } = useAppBar();
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
  useEffect(() => {
    if (!isOpenAppBar) toggleIsOpen.off();
  }, [isOpenAppBar]);
  //
  return (
    <ApplicationBarItemSingle
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
        <PanelSubMenu
          onMouseEnter={toggleIsInSubmenu.on}
          onMouseLeave={toggleIsInSubmenu.off}
          node={parent}
          onClose={toggleIsOpen.off}
        >
          <SubMenuList parent={parent} />
        </PanelSubMenu>
      </Popper.Appear>
    </ApplicationBarItemSingle>
  );
}
