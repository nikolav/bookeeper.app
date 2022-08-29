const variantsPageTransitions = {
  fade: {
    from: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    out: {
      position: "absolute",
      width: "100%",
      zIndex: -1,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  },
  slideLeft: {
    from: {
      opacity: 0,
      x: 24,
    },
    in: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 0.2,
      },
    },
    out: {
      opacity: 0,
      x: -24,
      transition: {
        duration: 0.1,
      },
      position: "absolute",
      width: "100%",
      zIndex: -1,
    },
  },
};

export default variantsPageTransitions;
