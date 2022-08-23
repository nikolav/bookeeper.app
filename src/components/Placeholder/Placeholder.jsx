/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { isNumeric, classnames as cls } from "../../util";

// @/src/global.scss
const CLASS_GLOW = "placeholderGlow";
//
const styleRoot = ({ width, height, color }) => css`
  display: inline-block;
  cursor: progress;
  border-radius: 2px;
  width: ${isNumeric(width) ? width + "px" : width};
  height: ${isNumeric(height) ? height + "px" : height};
  background-color: ${color};
  margin: 0;
  padding: 0;
`;

const Span = styled.span`
  ${styleRoot}
`;

const Placeholder = ({
  width = "5rem",
  height = "1rem",
  color = "currentColor",
  glow = true,
  className = "",
  ...rest
}) => (
  <Span
    width={width}
    height={height}
    color={color}
    className={cls(className, {
      [CLASS_GLOW]: true === glow,
    })}
    {...rest}
  />
);

//
export default Placeholder;
