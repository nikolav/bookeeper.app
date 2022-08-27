// import {
//   MdOutlineInsertDriveFile as IconFile
// } from "../../../components/icons"

export default {
  label: "Selection",
  children: [
    {
      label: "Select All",
      shortcut: "Ctrl + A",
    },
    {
      label: "Expand Selection",
      shortcut: "Shift + Alt + RightArrow",
    },
    {
      label: "Shrink Selection",
      shortcut: "Shift + Alt + LeftArrow",
    },
    { divider: true },
    {
      label: "Copy Line Up",
      shortcut: "Shift + Alt + UpArrow",
    },
    {
      label: "Copy Line Down",
      shortcut: "Shift + Alt + DownArrow",
    },
    {
      label: "Move Line Up",
      shortcut: "Alt + UpArrow",
    },
    {
      label: "Move Line Down",
      shortcut: "Alt + DownArrow",
    },
    {
      label: "Duplicate Selection",
    },
    { divider: true },
    {
      label: "Add Cursor Above",
      shortcut: "Ctrl + Alt + UpArrow",
    },
    {
      label: "Add Cursor Below",
      shortcut: "Ctrl + Alt + DownArrow",
    },
    {
      label: "Add Cursor to Line Ends",
      shortcut: "Shift + Alt + I",
    },
    {
      label: "Add Next Occurrence",
      shortcut: "Ctrl + D",
    },
    {
      label: "Add Previous Occurrence",
    },
    {
      label: "Select All Occurrences",
      shortcut: "Ctrl + Shift + L",
    },
    { divider: true },
    {
      label: "Switch to Ctrl+Click for Multi-Cursor",
    },
    {
      label: "Column Selection Mode",
    },
  ],
};
