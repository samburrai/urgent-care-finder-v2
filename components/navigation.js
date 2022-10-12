import Link from "next/link"
import styles from "../styles/Navigation.module.css"

export default function Navigation() {
  return (
    <header>
      <nav className={styles.nav}>
        <Link href="/">
          <a>NC Urgent Care Finder</a>
        </Link>
      </nav>
    </header>
  )
}