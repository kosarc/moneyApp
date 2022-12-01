import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = (email, password) => {
    setIsPending(true);
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        if (!res) {
          setIsPending(false);
          throw new Error("Could not login");
        } else {
          setIsPending(false);
          setError(null);
          console.log(res.user);
          dispatch({ type: "LOGIN", payload: res.user });
        }
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  };

  return { login, error, isPending };
};
