import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script'
import styles from "../styles/Index.module.css"

export default function Index() {
  return (
    <div className={styles.index}>
      <Head>
        <title>Urgent Care Finder</title>
        <meta name="description" content="Urgent Care Finder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script type="module" src="https://unpkg.com/@patternfly/pfe-cta@1.12.3/dist/pfe-cta.min.js" />

      <h1>Urgent Care Finder</h1>
      <p>Lorem ipsum something and you really need to do this</p>
      <Link href="/home">
        <pfe-cta priority="primary"><a>Find a location</a></pfe-cta>
      </Link>
    </div>
  )
}