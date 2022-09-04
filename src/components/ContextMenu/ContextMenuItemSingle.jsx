/** @jsxImportSource @emotion/react */
import { forwardRef } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useMenuContext } from "./ContextMenu";
import { useAppEvents } from "../../hooks";
import { MdChevronRight as IconChevronRight } from "../icons";
import { COMMAND__CONTEXT_MENU__DEFAULT } from "../../assets/context-menu";
//
const styleMenuItem = ({ isDisabled }) => css`
  list-style: none;
  margin: 0;
  padding: 0;
  user-select: none;
  cursor: ${!isDisabled && "pointer"};
  opacity: ${isDisabled && 0.33};
  transition: background-color 0.055s linear;
  &:hover {
    background-color: ${!isDisabled && "rgba(0, 0, 0, 0.048)"};
  }
  &:active {
    background-color: ${!isDisabled && "rgba(0, 0, 0, 0.22)"};
    color: ${!isDisabled && "white"};
  }
  & .ContextMenu--command-target {
    padding: 0.18rem 0.33rem;
  }
  &:first-of-type .ContextMenu--command-target {
    padding-top: 0.25rem;
  }
  &:last-child .ContextMenu--command-target {
    padding-bottom: 0.33rem;
  }
`;
const MenuItem = styled.li`
  ${styleMenuItem}
`;
//
const ContextMenuItemSingle = forwardRef(function ContextMenuItemSingle_(
  { node, children, ...rest },
  ref
) {
  //
  const { icon, label, shortcut, disabled, command, isActive } = node.value();
  const { iconWidth, gapLabelShortuct, commit, closeMenu } = useMenuContext();
  //
  const isDisabled = true === disabled;
  const isParent = node.hasClass("hasChildren");
  const isActive_ = false !== isActive;
  //
  const emitter = useAppEvents();
  const runCommand = (e) => {
    if (!isDisabled && !isParent) {
      //
      emitter.triggerEvent(
        null != command ? command : COMMAND__CONTEXT_MENU__DEFAULT,
        {
          node,
          commit,
        }
      );
      //
      closeMenu();
      return;
    }
    //
    // ignore @clickAway
    e.stopPropagation();
  };
  //
  return (
    <MenuItem ref={ref} isDisabled={isDisabled} {...rest}>
      {/*  */}
      {/* @command trigger */}
      <div
        onClick={runCommand}
        className="ContextMenu--command-target h-full w-full flex items-center justify-between"
      >
        <span className="flex items-center">
          <span
            style={{ width: iconWidth }}
            className="ContextMenu-SubMenu--icon ***bg-stone-200"
          >
            {isActive_ && icon}
          </span>
          <span style={{ marginRight: gapLabelShortuct }}>{label}</span>
        </span>

        <span className="flex items-center">
          <span className="ContextMenu-SubMenu--icon">{shortcut}</span>
          <span
            style={{ width: iconWidth }}
            className="ContextMenu-SubMenu--icon"
          >
            {isParent && <IconChevronRight style={{ fontSize: 18 }} />}
          </span>
        </span>
      </div>
      {/*  */}
      {/* render submenu */}
      {children}
    </MenuItem>
  );
});

export default ContextMenuItemSingle;
