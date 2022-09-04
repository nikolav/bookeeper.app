/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useMeasure } from "react-use";
import { isNumeric } from "../../util";
//
const Resizable = styled.section(
  ({ height }) => css`
    border: none;
    height: ${isNumeric(height) ? height + "px" : height};
    margin: 0;
    padding: 0;
    position: relative;
    z-index: 1;
  `
);
//
const styleBox = css`
  background-color: white;
  border-bottom: 1px dotted lightgray;
  height: 100%;
  overflow-y: auto;
  position: relative;
`;
const styleHandle = css`
  background-color: gray;
  cursor: ns-resize;
  height: 0.33rem;
  position: absolute;
  width: 1%;
  z-index: 1;
`;
//
const BoxResizeTop = ({ height = 256, onResize = null, children, ...rest }) => {
  //
  // track y-offset
  const y$ = useMotionValue(0);
  const h$ = useTransform(y$, (d) => height - d);
  //
  // resize width @client resize
  const [r$, { width }] = useMeasure();
  //
  // trigger callback @resize
  useEffect(() => y$.onChange((d) => onResize && onResize(d)), []);
  //
  return (
    <Resizable height={height}>
      <motion.div
        drag="y"
        style={{ y: y$, width }}
        dragElastic={0}
        dragConstraints={{ bottom: height }}
        dragMomentum={0}
        css={[styleHandle]}
      />
      <motion.div
        ref={r$}
        style={{ y: y$, height: h$ }}
        css={[styleBox]}
        {...rest}
      >
        {children}
      </motion.div>
    </Resizable>
  );
};
//
export default BoxResizeTop;
