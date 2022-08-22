const variantsPageTransitions = {
  fade: {
    in: {
      opacity: 1,
      transition: {
        duration: 0.24,
      },
    },
    out: {
      opacity: 0.24,
      transition: {
        duration: 0.24,
      },
      position: "absolute",
      width: "100%",
      zIndex: -1,
    },
  },
};

export default variantsPageTransitions;
