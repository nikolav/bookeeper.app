import { tree } from "../../../util";
import {
  iconAlignObjects,
  iconAnchor,
  iconAttachToPageBottom,
  iconAttachToPageRight,
  iconBackOne,
  iconBringToFront,
  iconCheck,
  iconConvertToImage,
  iconCopy,
  iconCreate,
  iconCube3D,
  iconCut,
  iconFillPaint,
  iconFlipHorizontal,
  iconFlipVertical,
  iconForwardOne,
  iconFunction,
  iconHtmlSource,
  iconHyperlink,
  iconLineBorder,
  iconPaste,
  iconPopupMenu,
  iconResize,
  iconRotateLeft,
  iconRotateRight,
  iconSendToBack,
  iconShadow,
  iconTransparency,
  iconWatermark,
} from "../icons";
//
const treeContextMenuDemo = new tree({ label: "@ContextMenu" });
const middleware = (node, src) =>
  0 < src.children?.length && node.addClass("hasChildren");
//
treeContextMenuDemo.json(
  {
    label: "demo",
    children: [
      { label: "Cut", icon: iconCut, shortcut: "Ctrl + X" },
      { label: "Copy", icon: iconCopy, shortcut: "Ctrl + C" },
      { label: "Paste", icon: iconPaste, shortcut: "Ctrl + V" },
      { divider: true },
      { label: "Edit Properties" },
      { divider: true },
      { label: "Hyperlink...", icon: iconHyperlink },
      { label: "Popup Menu...", icon: iconPopupMenu },
      { label: "HTML Source...", icon: iconHtmlSource },
      {
        label: "Format",
        children: [
          { label: "Fill...", icon: iconFillPaint },
          { label: "Line and Border...", icon: iconLineBorder },
          { label: "Transparency...", icon: iconTransparency },
          {
            label: "Fill Mode",
            children: [
              { label: "Alternate", icon: iconCheck },
              { label: "Winding" },
            ],
          },
          { label: "Filter Effects...", icon: iconFunction },
          { label: "Shadow", icon: iconShadow },
          { label: "Instant 3D", icon: iconCube3D },
          { label: "Watermarks...", disabled: true, icon: iconWatermark },
          { divider: true },
          { label: "Update Object Default" },
          {
            label: "Object Style",
            children: [
              { label: "Locate in Styles Tab", disabled: true },
              { label: "Unlink", disabled: true },
              { label: "Create", icon: iconCreate },
            ],
          },
        ],
      },
      {
        label: "Flip/Rotate",
        children: [
          { label: "Flip Horizontal", icon: iconFlipHorizontal },
          { label: "Flip Vertical", icon: iconFlipVertical },
          { label: "Rotate Left", icon: iconRotateLeft },
          { label: "Rotate Right", icon: iconRotateRight },
        ],
      },
      { divider: true },
      {
        label: "Arrange",
        children: [
          { label: "Send To Back", icon: iconSendToBack },
          { label: "Bring To Front", icon: iconBringToFront },
          {
            label: "Back One",
            icon: iconBackOne,
            shortcut: "Ctrl + Shift + ArrowDown",
          },
          {
            label: "Forward One",
            icon: iconForwardOne,
            shortcut: "Ctrl + Shift + ArrowUp",
          },
          { divider: true },
          { label: "Align Objects...", icon: iconAlignObjects },
          { label: "Size Objects...", disabled: true, icon: iconResize },
          { divider: true },
          { label: "Attach to Text...", icon: iconAnchor },
          { label: "Attach to Right of Page", icon: iconAttachToPageRight },
          { label: "Attach to Bottom of Page", icon: iconAttachToPageBottom },
          { label: "Lock Objects" },
        ],
      },
      {
        label: "Convert To",
        children: [
          { label: "Picture...", icon: iconConvertToImage },
          { label: "Picture Frame" },
          { label: "Curves" },
          { label: "HTML Fragment", icon: iconHtmlSource },
        ],
      },
    ],
  },
  middleware
);
//
export default treeContextMenuDemo;
