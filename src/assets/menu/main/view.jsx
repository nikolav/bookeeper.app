import { iconCheck } from "./icons";
//
export const GROUP__PANEL_POSITION = "vfjpyktwbgy";
export const COMMAND__PANEL_POSITION_BOTTOM = "rzfgdgdrkgl";
export const COMMAND__PANEL_POSITION_LEFT = "idtcdkuuhvt";
export const COMMAND__PANEL_POSITION_RIGHT = "kxbbrrhoxza";
//
export default {
  label: "View",
  children: [
    { label: "Command Palette...", shortcut: "Ctrl + Shift + P" },
    { label: "Open View..." },
    { divider: true },
    {
      label: "Appearance",
      children: [
        { label: "Full Screen", shortcut: "F11" },
        { label: "Zen Mode", shortcut: "Ctrl + KZ" },
        { label: "Centered Layout" },
        { divider: true },
        {
          label: "Menu Bar",
          icon: iconCheck,
        },
        {
          label: "Primary Side Bar",
          shortcut: "Ctrl + B",
          icon: iconCheck,
        },
        { label: "Secondary Side Bar" },
        {
          label: "Status Bar",
          icon: iconCheck,
        },
        {
          label: "Activity Bar",
          icon: iconCheck,
        },
        { label: "Panel", shortcut: "Ctrl + J" },
        { divider: true },
        { label: "Move Primary Side Bar Left" },
        {
          label: "Panel Position",
          children: [
            {
              label: "Bottom",
              icon: iconCheck,
              isActive: true,
              group: GROUP__PANEL_POSITION,
              command: COMMAND__PANEL_POSITION_BOTTOM,
            },
            {
              label: "Left",
              icon: iconCheck,
              isActive: false,
              group: GROUP__PANEL_POSITION,
              command: COMMAND__PANEL_POSITION_LEFT,
            },
            {
              label: "Right",
              icon: iconCheck,
              isActive: false,
              group: GROUP__PANEL_POSITION,
              command: COMMAND__PANEL_POSITION_RIGHT,
            },
          ],
        },
        {
          label: "Align Panel",
          children: [
            {
              label: "Center",
              icon: iconCheck,
            },
            { label: "Justify" },
            { label: "Left" },
            { label: "Right" },
          ],
        },
        { divider: true },
        { label: "Zoom In", shortcut: "Ctrl + =" },
        { label: "Zoom Out", shortcut: "Ctrl + -" },
        { label: "Reset Zoom", shortcut: "Ctrl + NumPad0" },
      ],
    },
    {
      label: "Edit Layout",
      children: [
        { label: "Split Up" },
        { label: "Split Down" },
        { label: "Split Left" },
        { label: "Split Right" },
        { divider: true },
        { label: "Split in Group", shortcut: "Ctrl + K\\" },
        { divider: true },
        { label: "Single" },
        { label: "Two Columns" },
        { label: "Three Columns" },
        { label: "Two Rows" },
        { label: "Three Rows" },
        { label: "Grid (2x2)" },
        { label: "Two Rows Right" },
        { label: "Two Columns Bottom" },
        { divider: true },
        { label: "Flip Layout", shortcut: "Shift + Alt + 0" },
      ],
    },
    { divider: true },
    { label: "Explorer", shortcut: "Ctrl + Shift + E" },
    { label: "Search", shortcut: "Ctrl + Shift + F" },
    { label: "Source Controll", shortcut: "Ctrl + Shift + G" },
    { label: "Run", shortcut: "Ctrl + Shift + D" },
    { label: "Extensions", shortcut: "Ctrl + Shift + X" },
    { divider: true },
    { label: "Problems", shortcut: "Ctrl + Shift + M" },
    { label: "Output", shortcut: "Ctrl + Shift + U" },
    { label: "Debug Console", shortcut: "Ctrl + Shift + Y" },
    { label: "Terminal", shortcut: "Ctrl + `" },
    { divider: true },
    { label: "Word Wrap", shortcut: "Alt + Z" },
    {
      label: "Minimap",
      icon: iconCheck,
    },
    {
      label: "Breadcrumbs",
      icon: iconCheck,
    },
    {
      label: "Render Whitespace",
      icon: iconCheck,
    },
    {
      label: "Render Controll Characters",
      icon: iconCheck,
    },
  ],
};
