import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { server } from "../config";

export default function Home({ locations }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Urgent Care Finder</title>
        <meta name="description" content="Urgent Care Finder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          Urgent Care Finder
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.list}>
          <ul>
            {locations.map(location => (
              <li key={location.attributes.ID}>
                <h2>{location.attributes.NAME}</h2>
                <address>
                  {location.attributes.ADDRESS}
                  {location.attributes.CITY}, {location.attributes.STATE} {location.attributes.ZIP}
                  {location.attributes.TELEPHONE}
                </address>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.map}>Map</div>
      </main>

      <footer>
        Footer
      </footer>
    </div>
  )
}

export async function getServerSideProps(context) {

  const res = await fetch(`${server}/api/data`);
  const data = await res.json();
  const locations = data.features;

  return {
    props: {
      locations
    },
  }
}
