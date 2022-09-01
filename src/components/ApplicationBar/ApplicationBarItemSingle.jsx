/** @jsxImportSource @emotion/react */
import { forwardRef } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { MdChevronRight as IconChevronRight } from "../icons";
import { useAppBar } from "./ApplicationBar";
import { useAppEvents } from "../../hooks";
import { COMMAND__DEFAULT } from "../../assets/menu";
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
  & .ApplicationBar--command-target {
    padding: 0.1rem 0.33rem;
  }
  &:first-of-type .ApplicationBar--command-target {
    padding-top: 0.25rem;
  }
  &:last-child .ApplicationBar--command-target {
    padding-bottom: 0.33rem;
  }
`;
const MenuItem = styled.li`
  ${styleMenuItem}
`;
//
const ApplicationBarItemSingle = forwardRef(
  ({ node, children, ...rest }, ref) => {
    //
    const { icon, label, shortcut, disabled, command, isActive } = node.value();
    const { iconWidth, gapLabelShortuct, commit, closeMenu } = useAppBar();
    //
    const isDisabled = true === disabled;
    const isParent = node.hasClass("hasChildren");
    const isActive_ = false !== isActive;
    //
    const emit = useAppEvents();
    const runCommand = (e) => {
      if (!isDisabled && !isParent) {
        emit.triggerEvent(null != command ? command : COMMAND__DEFAULT, {
          node,
          commit,
        });
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
          className="ApplicationBar--command-target h-full w-full flex items-center justify-between"
        >
          <span className="flex items-center">
            <span
              style={{ width: iconWidth }}
              className="MenuBar-SubMenu--icon"
            >
              {isActive_ && icon}
            </span>
            <span style={{ marginRight: gapLabelShortuct }}>{label}</span>
          </span>

          <span className="flex items-center">
            <span className="MenuBar-SubMenu--icon">{shortcut}</span>
            <span
              style={{ width: iconWidth }}
              className="MenuBar-SubMenu--icon"
            >
              {isParent && <IconChevronRight style={{ fontSize: 22 }} />}
            </span>
          </span>
        </div>
        {/*  */}
        {/* render submenu */}
        {children}
      </MenuItem>
    );
  }
);

export default ApplicationBarItemSingle;
