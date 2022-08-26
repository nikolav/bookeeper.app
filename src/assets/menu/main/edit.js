export default {
    label: "Edit",
    children: [
      {
        label: "New File",
        shortcut: "Ctrl + N",
      },
      {
        label: "Open File",
        shortcut: "Ctrl + O",
      },
      {
        label: "Open Folder",
        shortcut: "Ctrl + KO",
      },
      {
        divider: true,
      },
      {
        label: "Open Recent",
        shortcut: "Ctrl + KO",
        children: [
          {
            label: "file-1.txt",
          },
          {
            label: "file-2.txt",
          },
        ],
      },
      {
        label: "Save",
        shortcut: "Ctrl + S",
      },
      {
        divider: true,
      },
      {
        label: "Close",
        shortcut: "Ctrl + X",
      },
      {
        label: "Exit",
        shortcut: "Alt + F4",
      },
    ],
  };
  