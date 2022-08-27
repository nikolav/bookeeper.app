/** @jsxImportSource @emotion/react */
import { forwardRef } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { MdChevronRight as IconChevronRight } from "../icons";

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
const MenuItem = styled.li`
  ${styleMenuItem}
`;
//
const ApplicationBarItemSingle = forwardRef(
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
    //
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

export default ApplicationBarItemSingle;
