const withReturnValue = (callback, returnValue = null) => {
  return (...args) => {
    callback(...args);
    return returnValue;
  };
};
export default withReturnValue;
