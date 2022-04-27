import Link from "next/link";
import styles from "../styles/Header.module.css";

const Header = () => {
  const links = [
    { label: "Login", href: "/login" },
    { label: "Sign up", href: "#" },
    { label: "Sign out", href: "#" },
  ].map(({ label, href }) => (
    <Link href={href}>
      <a className={styles.navItem}>{label}</a>
    </Link>
  ));

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={"/"}>
          <a>ConsultUtopia</a>
        </Link>
      </div>
      <nav className={styles.navigation}>{links}</nav>
    </header>
  );
};

export default Header;
