/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useMenuContext } from "./ContextMenu";
import { getNodeKey } from "../../util";
//
const stylePanel = css`
  background-color: white;
  border-radius: 3px;
  overflow-y: auto;
  font-size: 82%;
  margin: 0;
  padding: 0;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  overflow-x: hidden;
`;
export const Panel = styled.div`
  ${stylePanel}
`;
//
const ContextMenuPanelSubMenu = ({ node, onClose, children, ...rest }) => {
  const { pushStackESC, popStackESC } = useMenuContext();
  const path = getNodeKey(node);
  //
  useEffect(() => {
    pushStackESC({ path, onClose });
    return () => popStackESC({ path });
  }, []);
  //
  return <Panel {...rest}>{children}</Panel>;
};
//
export default ContextMenuPanelSubMenu;
