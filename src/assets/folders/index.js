import { tree } from "../../util";

const root = new tree({ label: "@" });

const a = root.node({ value: { label: "/home" } });
const a0 = root.node({ value: { label: ".git" } });
const a1 = root.node({ value: { label: "docs" } });
const a2 = root.node({ value: { label: "images" } });
const a1_0 = root.node({ value: { label: "german" } });

//
a.append(a0);
a0.append(root.node({ value: { label: "ref" } }));
a0.append(root.node({ value: { label: "HEAD" } }));
a.append(a1);
a1.append(a1_0);
a1_0.append(root.node({ value: { label: "course.pdf" } }));
a1_0.append(root.node({ value: { label: "dictionary.pdf" } }));
a1.append(root.node({ value: { label: "linux-kernel.pdf" } }));
a1.append(root.node({ value: { label: "hacking-vi.pdf" } }));
a1.append(root.node({ value: { label: "girls-for-dummies.pdf" } }));
a.append(a2);
a2.append(root.node({ value: { label: "cerci.jpg" } }));
a2.append(root.node({ value: { label: "margery.jpg" } }));
a.append(root.node({ value: { label: ".bashrc" } }));
a.append(root.node({ value: { label: "send-mail.sh" } }));
a.append(root.node({ value: { label: "save.sh" } }));
root.append(a);
//
export default root;
