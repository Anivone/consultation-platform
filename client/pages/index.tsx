import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.content}>
        <h1>Hello world !</h1>
        <div>Font test</div>
      </div>
    </div>
  );
};

export default Home;
