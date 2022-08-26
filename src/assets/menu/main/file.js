export default {
  label: "File",
  children: [
    {
      label: "New File",
      icon: "N",
      shortcut: "Ctrl + N",
      command: null,
    },
    {
      label: "Open File",
      shortcut: "Ctrl + O",
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
      label: "Export",
      shortcut: "Ctrl + E",
      children: [
        {
          label: "image",
          children: [
            { label: "image-1" },
            { label: "image-2" },
          ]
        },
        {
          label: "pdf",
        },
        {
          label: "xls",
        },
      ],
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
