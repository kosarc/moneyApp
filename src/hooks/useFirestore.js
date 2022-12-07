import { useEffect, useState, useReducer } from "react";
import { db, timestamp } from "../firebase/config";
import { collection, addDoc, setDoc, deleteDoc, doc } from "firebase/firestore";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  succes: false,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, error: null, succes: false };

    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        succes: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        succes: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const useFirestore = (col) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  const ref = collection(db, col);

  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await addDoc(ref, { ...doc, createdAt });
      dispatch({ type: "ADDED_DOCUMENT", payload: addedDocument });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  const deleteDocument = (id) => {};

  return { addDocument, deleteDocument, response };
};
