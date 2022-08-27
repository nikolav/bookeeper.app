// import { IconCheck } from "../../../components/icons";
//
export default {
  label: "Run",
  children: [
    { label: "Start Debugging", shortcut: "F5" },
    { label: "Run Without Debugging", shortcut: "Ctrl + F5" },
    { label: "Stop Debugging", shortcut: "Shift + F5", disabled: true },
    {
      label: "Restart Debugging",
      shortcut: "Ctrl + Shift + F5",
      disabled: true,
    },
    { divider: true },
    { label: "Open Configurations", disabled: true },
    { label: "Add Configurations..." },
    { divider: true },
    { label: "Step Over", shortcut: "F10", disabled: true },
    { label: "Step Into", shortcut: "F11", disabled: true },
    { label: "Step Out", shortcut: "Shift + F11", disabled: true },
    { label: "Continue", shortcut: "F5", disabled: true },
    { divider: true },
    { label: "Toggle Breakpoint" },
    {
      label: "New Breakpoint",
      children: [
        { label: "Conditional Breakpoint..." },
        { label: "Inline Breakpoint", shortcut: "Shift + F9" },
        { label: "Function Breakpoint..." },
        { label: "Logpoint..." },
      ],
    },
    { divider: true },
    { label: "Enable All Breakpoints" },
    { label: "Disable All Breakpoints" },
    { label: "Remove All Breakpoints" },
    { divider: true },
    { label: "Install Additional Debuggers..." },
  ],
};
