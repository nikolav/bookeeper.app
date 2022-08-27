import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { paste } from "../../util";

//
export const FLAG_TEST = "gigciljifcl";
export const FLAG_APP_IS_PROCESSING = "lkojvpoyfbl";
//
export const FLAG_MENU_OPEN = "cwnhdskjqtj";
//
//
const initialState = {
  [FLAG_TEST]: null,
  [FLAG_APP_IS_PROCESSING]: false,
  //
  [FLAG_MENU_OPEN]: false,
};

export const flagsSlice = createSlice({
  name: "flags",
  initialState,
  reducers: {
    toggleFlag: (state, action) => {
      state[action.payload] = !state[action.payload];
    },
    toggleFlagOn: (state, action) => {
      state[action.payload] = true;
    },
    toggleFlagOff: (state, action) => {
      state[action.payload] = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleFlag, toggleFlagOn, toggleFlagOff } = flagsSlice.actions;

export default flagsSlice.reducer;

//
// export redux store shortcut
export function useFlags() {
  //
  const flags = useSelector((state) => state.flags);
  const dispatch = useDispatch();
  //
  const handle = paste((name) => flags[name], {
    // general flags api
    isOn: (name) => true === flags[name],
    off: (name) => dispatch(toggleFlagOff(name)),
    on: (name) => dispatch(toggleFlagOn(name)),
    toggle: (name) => dispatch(toggleFlag(name)),
    // handle app-processing flag
    setProcessingOn: () => dispatch(toggleFlagOn(FLAG_APP_IS_PROCESSING)),
    setProcessingOff: () => dispatch(toggleFlagOff(FLAG_APP_IS_PROCESSING)),
    isProcessing: () => flags[FLAG_APP_IS_PROCESSING],
  });
  //
  return handle;
}
