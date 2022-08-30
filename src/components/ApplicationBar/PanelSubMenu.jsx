import { useEffect } from "react";
import { Panel } from "./ApplicationBarSection";
import { useAppBar } from "./ApplicationBar";
import { getNodeKey } from "../../util";

export default function PanelSubMenu({ node, onClose, children, ...rest }) {
  const { pushStackESC, popStackESC } = useAppBar();
  const path = getNodeKey(node);
  //
  useEffect(() => {
    pushStackESC({ path, onClose });
    return () => popStackESC({ path });
  }, []);
  //
  return <Panel {...rest}>{children}</Panel>;
}
