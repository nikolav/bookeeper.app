import { useState, useEffect } from "react";
import { useAppBar } from "./ApplicationBar";
import ApplicationBarItemSingle from "./ApplicationBarItemSingle";
import { PanelRoot } from "./ApplicationBarSection";
import { Popper } from "../index";
import SubMenuList from "./SubMenuList";
import { useStateSwitch } from "../../hooks";
//
export default function SubMenuItem({ parent, isInMenuList }) {
  const { menuOffsetSecondary, isOpenAppBar, timeout, effect, iconWidth } =
    useAppBar();
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
    if (!isOpenAppBar) toggleIsOpen.off();
  }, [isOpenAppBar]);
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
      icon={icon}
      label={label}
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
    </ApplicationBarItemSingle>
  );
}
