import { tree } from "../../util";

const root = new tree({ label: "@" });

root.json(
  {
    label: "home",
    children: [
      {
        label: ".git",
        children: [
          {
            label: "commits",
            children: [
              { label: "oosjfusllohophofptrulpdoqbaxfhwifpxynmdmz" },
              { label: "erswophbmsbangykycvsrcczdvmdztccxeqdwjxwg" },
            ],
          },
          {
            label: "remotes",
            children: [
              {
                label: "@1",
                children: [
                  {
                    label: "@1-1",
                    children: [{ label: "https://nikolav.rs/" }],
                  },
                ],
              },
              { label: "@2" },
            ],
          },
          { label: "ref" },
          { label: "HEAD" },
        ],
      },
      {
        label: "docs",
        children: [
          {
            label: "german",
            children: [{ label: "course.pdf" }, { label: "dictionary.pdf" }],
          },
          { label: "linux-kernel.pdf" },
          { label: "hacking-vi.pdf" },
          { label: "girls-for-dummies.pdf" },
        ],
      },
      {
        label: "images",
        children: [{ label: "cerci.jpg" }, { label: "margery.jpg" }],
      },
      {
        label: "temp",
        children: [
          {
            label: "empty-folder",
            children: [],
          },
        ],
      },
      { label: ".bashrc" },
      { label: "send-sms.sh" },
      { label: "trash.sh" },
    ],
  },
  (newNode, json) => {
    newNode.value((val) => ({ ...val, _hasChildren: "children" in json }));
  }
);

//
export default root;
