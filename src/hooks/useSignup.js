import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

//firebase imports
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        if (!res) {
          setIsPending(false);
          throw new Error("Could not complete signup");
        } else {
          updateProfile(auth.currentUser, { displayName });
          setIsPending(false);
          setError(null);

          res.user.displayName = { displayName };
          dispatch({ type: "LOGIN", payload: res.user });
        }
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  };

  return { error, isPending, signup };
};
