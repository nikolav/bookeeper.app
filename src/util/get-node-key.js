export default (node) =>
  node
    ? node
        .path()
        .map((p) => p.value()["label"])
        .join("/")
    : "";
