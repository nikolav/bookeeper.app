import { useEffect, useState } from "react";
import { onValue, set, ref } from "firebase/database";
import { firebase } from "../app/services";
//
const { dbRealtime: db } = firebase;
//
export const localId = (id) => `dtvxsfzlvit.${id}`;
//@@
const useSocialLike = (id) => {
  //
  const LIKECACHE = localId(id);
  //
  const [likeCount, setLikeCount] = useState(0);
  const refLike = ref(db, `like/${id}`);
  //
  const isLiked = () => null != localStorage.getItem(LIKECACHE);

  useEffect(
    () =>
      onValue(refLike, (res) =>
        setLikeCount((current) => res.val() ?? current)
      ),
    []
  );

  return { like, likeCount, isLiked };

  function like() {
    if (null != localStorage.getItem(LIKECACHE)) return unlike_();

    localStorage.setItem(LIKECACHE, 1);
    set(refLike, likeCount + 1);
  }

  function unlike_() {
    localStorage.removeItem(LIKECACHE);
    set(refLike, likeCount - 1);
  }
};

export default useSocialLike;
