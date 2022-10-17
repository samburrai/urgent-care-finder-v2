import styles from "../styles/Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>Deployed with <a href="https://vercel.com">Vercel</a></li>
        <li>
          <a href="https://github.com/kylebuch8/urgent-care-finder-v2/">View the code on GitHub</a>
        </li>
      </ul>
    </footer>
  )
}