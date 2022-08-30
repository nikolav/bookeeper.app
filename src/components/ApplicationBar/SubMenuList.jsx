/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import SubMenuItem from "./SubMenuItem";
import ApplicationBarItemSingle from "./ApplicationBarItemSingle";
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
export default function SubMenuList({ parent }) {
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
          <SubMenuItem key={label} parent={node} isInMenuList={isInMenuList} />
        ) : (
          <ApplicationBarItemSingle key={label} node={node} />
        );
      })}
    </MenuList>
  );
}

function Divider() {
  return <hr className="m-0 p-0 my-1 block border-stone-300" />;
}
