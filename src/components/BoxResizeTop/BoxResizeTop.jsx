/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useMeasure } from "react-use";
import { isNumeric } from "../../util";
//
const styleBox = css`
  border-bottom: 1px dotted lightgray;
  background-color: white;
  height: 100%;
  position: relative;
  overflow-y: auto;
`;
const styleHandle = css`
  background-color: gray;
  cursor: ns-resize;
  position: absolute;
  height: 0.33rem;
  width: 1%;
  z-index: 1;
`;
//
const ResizableArea = styled.section(
  ({ height }) => css`
    height: ${isNumeric(height) ? height + "px" : height};
    margin: 0;
    padding: 0;
    border: none;
    position: relative;
    z-index: 1;
  `
);
//
const BoxResizeTop = ({ height = 256, onResize = null, children, ...rest }) => {
  //
  const y$ = useMotionValue(0);
  const h$ = useTransform(y$, (d) => height - d);
  //
  const [r$, { width }] = useMeasure();
  //
  useEffect(() => y$.onChange((d) => onResize && onResize(d)), []);
  //
  return (
    <ResizableArea height={height}>
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
    </ResizableArea>
  );
};
//
export default BoxResizeTop;
