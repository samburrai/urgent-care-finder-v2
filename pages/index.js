import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { server } from "../config";
import Navigation from '../components/navigation';
import Footer from '../components/footer';

export default function Home({ locations }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Urgent Care Finder</title>
        <meta name="description" content="Urgent Care Finder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className={styles.main}>
        <div className={styles.list}>
          <ul>
            {locations.map(urgentCareCenter => (
              <li key={urgentCareCenter.properties.ID}>
                <h2>{urgentCareCenter.properties.NAME}</h2>
                <address>
                  {urgentCareCenter.properties.ADDRESS}<br />
                  {urgentCareCenter.properties.CITY}, {urgentCareCenter.properties.STATE} {urgentCareCenter.properties.ZIP}<br />
                  {urgentCareCenter.properties.TELEPHONE}
                </address>
                <div>
                  <Link href={urgentCareCenter.properties.ID + "/schedule-visit"}>
                    <a>Schedule a visit</a>
                  </Link>
                  <Link href={urgentCareCenter.properties.ID}>
                    <a>More information</a>
                  </Link>
                  <a href={"tel:" + urgentCareCenter.properties.TELEPHONE}>Call</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.map}>Map</div>
      </main>

      <Footer />
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
