import { useReducer } from "react";
//
const DEFAULT_ACCESSOR_KEY = ({ key }) => key;
// { path, onClose }
const useStackOnce = (getKey = DEFAULT_ACCESSOR_KEY) => {
  const [state, dispatch] = useReducer(
    (state, { type, node }) => {
      let stack;
      let tail;
      let isEmpty;
      switch (true) {
        case "push" === type:
          stack = [...drop_(state.stack, node), node];
          tail = node;
          isEmpty = false;
          break;
        case "pop" === type:
          stack = drop_(state.stack, node);
          tail = stack[stack.length - 1];
          isEmpty = 0 === stack.length;
          break;
        default:
          return { ...state };
      }
      //
      return { stack, tail, isEmpty };
    },
    {
      stack: [],
      tail: null,
      isEmpty: true,
    }
  );
  //
  const push = (node) => {
    dispatch({ type: "push", node });
  };
  const pop = (node) => {
    dispatch({ type: "pop", node });
  };
  //
  return { stack: state, push, pop };
  //
  function drop_(stack, target) {
    const id = getKey(target);
    return stack.filter((node) => id !== getKey(node));
  }
};

export default useStackOnce;
