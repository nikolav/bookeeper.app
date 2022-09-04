/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { isNumeric } from "../../util";
//
const Section = styled.section(
  ({ width }) => css`
    border: 0;
    height: 100%;
    margin: 0;
    padding: 0;
    position: relative;
    width: ${isNumeric(width) ? width + "px" : width};
    z-index: 1;
  `
);
const styleHandle = css`
  background-color: gray;
  cursor: ew-resize;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  width: 0.33rem;
  z-index: 1;
`;
const styleBox = css`
  background-color: white;
  height: 100%;
  overflow: auto;
`;
//
const BoxResizeLeft = ({ width = 480, onResize = null, children, ...rest }) => {
  const x$ = useMotionValue(0);
  const w$ = useTransform(x$, (d) => width - d);
  useEffect(() => x$.onChange((d) => onResize && onResize(d)), []);
  //
  return (
    <Section width={width}>
      {/* handle */}
      <motion.div
        drag="x"
        style={{ x: x$ }}
        dragConstraints={{ right: width }}
        dragMomentum={false}
        dragElastic={false}
        css={[styleHandle]}
      />
      {/* box */}
      <motion.div style={{ width: w$, x: x$ }} css={[styleBox]} {...rest}>
        {children}
      </motion.div>
    </Section>
  );
};

export default BoxResizeLeft;
