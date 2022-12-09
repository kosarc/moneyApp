import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  where,
  query,
  orderBy,
} from "firebase/firestore";

export const useCollection = (col, _query, _orderBy) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  //using useRef to prevent an infinite loop in useEffect
  //each array in dependancy of useEffect gonna be like a new one so useEffect will rerender infinitly.
  const q = useRef(_query).current;
  const oB = useRef(_orderBy).current;

  useEffect(() => {
    let ref = collection(db, col);

    if (q) {
      ref = query(collection(db, col), where(...q));
    }
    if (oB) {
      ref = query(collection(db, col), where(...q), orderBy(...oB));
    }

    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setError(null);
        setDocument(results);
      },
      (error) => {
        setError(error);
      }
    );

    return () => unsub();
  }, [col, q, oB]);

  return { document, error };
};
