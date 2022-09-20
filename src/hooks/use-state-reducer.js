import { assign, identity, has, transform } from "../util"
import { useReducer, useState } from "react";
// 
export const STATE_PUT = "state:put";
export const STATE_CLEAR = "state:clear";
// 
const useStateReducer = (initialValue = {}) => {
    const [m$, setm] = useState({ pre: identity, format: identity });
    const [r$, setr] = useState({});
    // 
    const [state, dispatch] = useReducer((state, { type, payload }) => {
        switch (true) {
            case STATE_PUT === type:
                const newState =
                    transform(payload,
                        (accumState, value, key, _src) => {
                            accumState[key] = has(r$, key) ? r$[key](value) : value;
                        }, { ...state });
                return m$.pre(newState);
            case STATE_CLEAR === type:
                return m$.pre({ ...state, [payload.name]: payload.empty });
            default:
                break;
        }
        // 
        return { ...state };
    }, initialValue);
    // 
    const client = assign(() => m$.format(state), {
        put: (callback) => dispatch({ type: STATE_PUT, payload: callback(state) }),
        clear: (name, empty = null) => dispatch({ type: STATE_CLEAR, payload: { name, empty } }),
        // @access | before write
        $pre: (callback) => setm(mw => ({ ...mw, pre: callback })),
        // @access | before read
        $format: (callback) => setm(mw => ({ ...mw, format: callback })),
        // @access | set validated, before write
        $rules: (rules) => setr(r => ({ ...r, ...rules })),
    })
    // 
    return client;
};

export default useStateReducer;
