/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
//
const styleSpotlight = css`
  border: none;
  display: inline-block;
  margin: 0;
  outline-color: transparent;
  padding: 0;
  transition: outline-color 0.122s ease-out;
`;
const styleSpotlightActive = css`
  border-radius: 1px;
  outline-offset: 0.33rem;
  outline: 9999px solid rgba(0, 0, 0, 0.62);
`;
//
const Spotlight = ({ isActive = true, children, ...rest }) => {
  //
  return (
    <span css={[styleSpotlight, isActive && styleSpotlightActive]} {...rest}>
      {children}
    </span>
  );
};

export default Spotlight;
