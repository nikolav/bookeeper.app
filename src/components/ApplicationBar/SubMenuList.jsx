//
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useAppBar } from "./ApplicationBar";
import { useStateSwitch } from "../../hooks";
import ApplicationBarItemSingle from "./ApplicationBarItemSingle";
import SubMenuItem from "./SubMenuItem";
//
const styleMenuList = css`
  list-style: none;
  margin: 0;
  padding: 0;
  min-width: 192px;
`;
const MenuList = styled.ul`
  ${styleMenuList}
`;
//
export default function SubMenuList({ parent }) {
  const { iconWidth } = useAppBar();
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
          <ApplicationBarItemSingle
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

function Divider() {
  return <hr className="m-0 p-0 my-1 block border-stone-300" />;
}
