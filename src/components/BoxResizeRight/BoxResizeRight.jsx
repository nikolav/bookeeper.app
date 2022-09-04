/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { isNumeric } from "../../util";
//
const Resizable = styled.section(
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
  right: 0;
  top: 0;
  width: 0.33rem;
`;
const styleBox = css`
  background-color: white;
  height: 100%;
  overflow: auto;
`;
//
const BoxResizeRight = ({
  // initial width
  width = 480,
  // callback
  onResize = null,
  //
  children,
  //
  ...rest
}) => {
  //
  const x$ = useMotionValue(0);
  const w$ = useTransform(x$, (d) => width + d);
  useEffect(() => x$.onChange((d) => onResize && onResize(d)), []);
  //
  return (
    <Resizable width={width}>
      {/* box */}
      <motion.div style={{ width: w$ }} css={[styleBox]} {...rest}>
        {children}
      </motion.div>
      {/* handle */}
      <motion.div
        drag="x"
        style={{ x: x$ }}
        dragConstraints={{ left: -1 * width }}
        dragMomentum={false}
        dragElastic={false}
        css={[styleHandle]}
      />
    </Resizable>
  );
};

export default BoxResizeRight;
