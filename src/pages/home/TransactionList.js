import styles from "./Home.module.css";

const TransactionList = ({ transaction }) => {
  console.log(transaction);
  return (
    <ul className={styles.transactions}>
      {transaction.map((val) => {
        return (
          <li key={val.id}>
            <p className={styles.name}>{val.name}</p>
            <p className={styles.amount}>${val.amount}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default TransactionList;
