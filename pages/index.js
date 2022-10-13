import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script'
import React from 'react';
import styles from "../styles/Index.module.css"

export default function Index() {
  return (
    <div className={styles.index}>
      <Head>
        <title>NC Urgent Care Finder</title>
        <meta name="description" content="NC Urgent Care Finder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script type="module" src="https://unpkg.com/@patternfly/pfe-cta@1.12.3/dist/pfe-cta.min.js" />

      <h1 className={styles.slideUp}>NC Urgent Care Finder</h1>
      <p className={styles.slideUp} style={{"--slideUp-delay": "0.1s"}}>Fast, convenient and affordable care near you.</p>
      <div className={styles.slideUp} style={{"--slideUp-delay": "0.2s"}}>
      <pfe-cta priority="primary"><Link href="/home" passHref><a>Find a location</a></Link></pfe-cta>
      </div>
    </div>
  )
}