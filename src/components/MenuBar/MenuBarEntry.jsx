/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

//
const styleMenuEntry = css`
  list-style: none;
`;
//
const Entry = styled.li`
  ${styleMenuEntry}
`;

const MenuBarEntry = ({ node }) => {
  const { label, shortcut, icon, disabled, divider, command } = node.value();
  return <Entry>{label}</Entry>;
};

export default MenuBarEntry;
