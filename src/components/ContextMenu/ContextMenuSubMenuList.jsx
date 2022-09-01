/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Divider from "./Divider";
import ContextMenuSubMenuItem from "./ContextMenuSubMenuItem";
import ContextMenuItemSingle from "./ContextMenuItemSingle";
import { useStateSwitch } from "../../hooks";
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
const ContextMenuSubMenuList = ({ parent }) => {
  const { isActive: isInMenuList, toggle: toggleIsInMenuList } =
    useStateSwitch();
  //
  return (
    <MenuList
      onMouseEnter={toggleIsInMenuList.on}
      onMouseLeave={toggleIsInMenuList.off}
    >
      {parent.ls().map((node, index) => {
        const { label, divider } = node.value();
        const isParent = node.hasClass("hasChildren");
        const isDivider = true === divider;
        //
        return isDivider ? (
          <Divider key={`divider-${index}`} />
        ) : isParent ? (
          <ContextMenuSubMenuItem
            key={label}
            parent={node}
            isInMenuList={isInMenuList}
          />
        ) : (
          <ContextMenuItemSingle key={label} node={node} />
        );
      })}
    </MenuList>
  );
};
//
export default ContextMenuSubMenuList;
