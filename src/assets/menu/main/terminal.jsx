// import {
//   MdOutlineInsertDriveFile as IconFile
// } from "../../../components/icons"

export default {
  label: "Terminal",
  children: [
    { label: "New Terminal", shortcut: "Ctrl + Shift + `" },
    { label: "Split Terminal", shortcut: "Ctrl + Shift + 5", disabled: true },
    { divider: true },
    { label: "Run Task..." },
    { label: "Run Build Task...", shortcut: "Ctrl + Shift + B" },
    { label: "Run Active File" },
    { label: "Run Selected Text" },
    { divider: true },
    { label: "Show Running Tasks...", disabled: true },
    { label: "Restart Running Task...", disabled: true },
    { label: "Terminate Task...", disabled: true },
    { divider: true },
    { label: "Configure Tasks..." },
    { label: "Configure Default Build Task..." },
  ],
};
