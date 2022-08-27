// import { IconCheck } from "../../../components/icons";
//
export default {
  label: "Go",
  children: [
    { label: "Back", shortcut: "Alt + LeftArrow" },
    { label: "Forward", shortcut: "Alt + RightArrow", disabled: true },
    { label: "Last Edit Location", shortcut: "Ctrl + KQ" },
    { divider: true },
    {
      label: "Switch Editor",
      children: [
        { label: "Next Editor", shortcut: "Ctrl + PageDown" },
        { label: "Previous Editor", shortcut: "Ctrl + PageUp" },
        { divider: true },
        { label: "Next Used Editor" },
        { label: "Previous Used Editor" },
        { divider: true },
        { label: "Next Editor in Group", shortcut: "Ctrl + K PageDown" },
        { label: "Previous Editor in Group", shortcut: "Ctrl + K PageUp" },
        { divider: true },
        { label: "Next Used Editor in Group" },
        { label: "Previous Used Editor in Group" },
      ],
    },
    {
      label: "Switch Group",
      children: [
        { label: "Group 1", shortcut: "Ctrl + 1" },
        { label: "Group 2", shortcut: "Ctrl + 2" },
        { label: "Group 3", shortcut: "Ctrl + 3", disabled: true },
        { label: "Group 4", shortcut: "Ctrl + 4", disabled: true },
        { label: "Group 5", shortcut: "Ctrl + 5", disabled: true },
        { divider: true },
        { label: "Next Group" },
        { label: "Previous Group" },
        { divider: true },
        { label: "Group Left", shortcut: "Ctrl + K LeftArrow", disabled: true },
        {
          label: "Group Right",
          shortcut: "Ctrl + K RightArrow",
          disabled: true,
        },
        { label: "Group Above", shortcut: "Ctrl + K UpArrow", disabled: true },
        {
          label: "Group Bellow",
          shortcut: "Ctrl + K DownArrow",
          disabled: true,
        },
      ],
    },
    { divider: true },
    { label: "Go to File...", shortcut: "Ctrl + P" },
    { label: "Go to Symbol in Workspace...", shortcut: "Ctrl + T" },
    { divider: true },
    { label: "Go to Symbol in Editor...", shortcut: "Ctrl + Shift + O" },
    { label: "Go to Definition", shortcut: "F12" },
    { label: "Go to Declaration" },
    { label: "Go to Type Definition" },
    { label: "Go to Implementations", shortcut: "Ctrl + F12" },
    { label: "Go to References", shortcut: "Shift + F12" },
    { divider: true },
    { label: "Go to Line/Column...", shortcut: "Ctrl + G" },
    { label: "Go to Bracket", shortcut: "Ctrl + Shift + \\" },
    { divider: true },
    { label: "Next Problem" },
    { label: "Previous Problem", shortcut: "Shift + F8" },
    { divider: true },
    { label: "Next Change", shortcut: "Alt + F3" },
    { label: "Previous Change", shortcut: "Shift + Alt + F3" },
  ],
};
