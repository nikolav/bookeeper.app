/** @jsxImportSource @emotion/react */
import { forwardRef } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { noop, isNumeric } from "../../util";

const styleMenuEntry = ({ px }) => css`
  list-style: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  padding-left: ${isNumeric(px) ? px + "px" : px};
  padding-right: ${isNumeric(px) ? px + "px" : px};
  /* @hover */
  opacity: 0.72;
  &:hover {
    opacity: 1;
  }
`;
const Entry = styled.li`
  ${styleMenuEntry}
`;
//
const ApplicationBarEntry = forwardRef(
  (
    {
      //
      node,
      //
      px = ".5rem",
      //
      onClick = noop,
      //
      onEnter = noop,
      //
      ...rest
    },
    ref
  ) => {
    const { icon, label } = node.value();
    //
    return (
      <Entry
        ref={ref}
        px={px}
        onClick={onClick}
        onMouseOver={onEnter}
        {...rest}
      >
        {icon && <strong className="MenuBar--icon">{icon}</strong>}
        {label}
      </Entry>
    );
  }
);

export default ApplicationBarEntry;
