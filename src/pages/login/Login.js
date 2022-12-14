import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

//styles
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);

    setEmail("");
    setPassword("");
  };

  return (
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {isPending && (
        <button className="btn" disabled>
          Loading
        </button>
      )}
      {!isPending && <button className="btn">Login</button>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
