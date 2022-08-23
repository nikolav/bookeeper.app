// https://github.com/streamich/react-use/blob/HEAD/docs/useLocalStorage.md
import { useLocalStorage as useLocalStorageBase } from "react-use";
import { assign } from "../util";

const DEFAULT_LOCAL_KEY = ".APPDATA";
//
const useLocalStorage = (
  key = DEFAULT_LOCAL_KEY,
  initial = null,
  config = null
) => {
  const [value, setValue, remove] = useLocalStorageBase(key, initial, config);
  return assign(() => value, {
    set: setValue,
    rm: remove,
  });
};

export default useLocalStorage;

/*
key — localStorage key to manage.
initialValue — initial value to set, if value in localStorage is empty.
raw — boolean, if set to true, hook will not attempt to JSON serialize stored values.
serializer — custom serializer (defaults to JSON.stringify)
deserializer — custom deserializer (defaults to JSON.parse)
*/
