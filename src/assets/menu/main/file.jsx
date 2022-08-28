import { iconFile } from "./icons";
//
// @file
// .command fields to dispatch @global .useAppEvents
export const COMMAND__NEW_TEXT_FILE = "spdfasslrlu";
export const COMMAND__NEW_FILE = "utrnyghpdsr";
//
export default {
  label: "File",
  children: [
    {
      label: "New Text File",
      shortcut: "Ctrl + N",
      command: COMMAND__NEW_TEXT_FILE,
    },
    {
      label: "New File...",
      shortcut: "Ctrl + Alt + Win + N",
      command: COMMAND__NEW_FILE,
      icon: iconFile,
      // signal .active
      // display icon
      isActive: true,
    },
    {
      label: "New Window",
      shortcut: "Ctrl + Shift + N",
    },
    {
      divider: true,
    },
    {
      label: "Open File...",
      shortcut: "Ctrl + O",
    },
    {
      label: "Open Folder...",
      shortcut: "Ctrl + KO",
    },
    {
      label: "Open Workspace from File...",
    },
    {
      label: "Open Recent",
      children: [
        { label: "Reopen Closed Editor", shortcut: "Ctrl + Shift + T" },
        { divider: true },
        { label: "https://nikolav.rs/" },
        { label: "/user/files/file-2" },
        { label: "/user/files/file-3" },
        { label: "/user/files/file-4" },
        { divider: true },
        { label: "/user/docs/file-1" },
        { label: "/user/docs/file-2" },
        { label: "/user/docs/file-3" },
        { label: "/user/docs/file-4" },
        { label: "/user/docs/file-5" },
        { divider: true },
        { label: "More...", shortcut: "Ctrl + R" },
        { divider: true },
        { label: "Clear Recently Opened" },
      ],
    },
    {
      divider: true,
    },
    {
      label: "Add Folder to Workspace...",
    },
    {
      label: "Save Workspace As...",
    },
    {
      label: "Duplicate Workspace",
    },
    {
      divider: true,
    },
    {
      label: "Save",
      shortcut: "Ctrl + S",
    },
    {
      label: "Save As...",
      shortcut: "Ctrl + Shift + S",
    },
    {
      label: "Save All",
      shortcut: "Ctrl + KS",
      disabled: true,
    },
    {
      divider: true,
    },
    {
      label: "Share",
      children: [],
    },
    {
      divider: true,
    },
    {
      label: "Auto Save",
    },
    {
      label: "Preferences",
      children: [
        { label: "Settings", shortcut: "Ctrl + ," },
        { label: "Online Services Settings" },
        { label: "Telemetry Settings" },
        { label: "Extensions", shortcut: "Ctrl + Shift +X" },
        { divider: true },
        { label: "Keyboard Shortcuts", shortcut: "Ctrl + KS" },
        { label: "Migrate Keyboard Shortcuts from..." },
        { divider: true },
        { label: "Configure User Snippets" },
        { divider: true },
        { label: "Color Theme", shortcut: "Ctrl + KT" },
        { label: "File Icon Theme" },
        { label: "Product Icon Theme" },
        { divider: true },
        { label: "Turn on Settings Sync..." },
      ],
    },
    {
      divider: true,
    },
    {
      label: "Revert File",
    },
    {
      label: "Close Editor",
      shortcut: "Ctrl + F4",
    },
    {
      label: "Close Workspace",
      shortcut: "Ctrl + KF",
    },
    {
      label: "Close Window",
      shortcut: "Alt + F4",
    },
    {
      divider: true,
    },
    {
      label: "Exit",
    },
  ],
};
