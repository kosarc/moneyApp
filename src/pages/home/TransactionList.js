import styles from "./Home.module.css";
import { useFirestore } from "../../hooks/useFirestore";

const TransactionList = ({ transaction }) => {
  const { deleteDocument } = useFirestore("transaction");

  return (
    <ul className={styles.transactions}>
      {transaction.map((val) => {
        return (
          <li key={val.id}>
            <p className={styles.name}>{val.name}</p>
            <p className={styles.amount}>${val.amount}</p>
            <button onClick={() => deleteDocument(val.id)}>x</button>
          </li>
        );
      })}
    </ul>
  );
};

export default TransactionList;
