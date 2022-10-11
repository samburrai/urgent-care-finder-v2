import Head from 'next/head'
import Link from 'next/link'
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
              <li key={location.properties.ID}>
                <h2>{location.properties.NAME}</h2>
                <address>
                  {location.properties.ADDRESS}<br />
                  {location.properties.CITY}, {location.properties.STATE} {location.properties.ZIP}<br />
                  {location.properties.TELEPHONE}
                </address>
                <div>
                  <Link href={location.properties.ID}>
                    <a>Schedule a visit</a>
                  </Link>
                  <a href={"tel:" + location.properties.TELEPHONE}>Call</a>
                </div>
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
  const res = await fetch(`${server}/api/locations`);
  const locations = await res.json();

  return {
    props: {
      locations
    },
  }
}
