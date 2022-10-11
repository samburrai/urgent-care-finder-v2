import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import { server } from '../../config'
import Navigation from '../../components/navigation'
import Footer from '../../components/footer'

export default function Location ({ urgentCareCenter }) {
  return (
    <div>
      <Head>
        <title>Urgent Care Finder - Location</title>
        <meta name="description" content="Urgent Care Finder - Location" />
      </Head>

      <Script type="module" src="https://unpkg.com/@patternfly/pfe-cta@latest/dist/pfe-cta.min.js" />

      <Navigation />

      <main>
        <h1>Location</h1>
        <h2>{urgentCareCenter.properties.NAME}</h2>
        <address>
          {urgentCareCenter.properties.ADDRESS}<br />
          {urgentCareCenter.properties.CITY}, {urgentCareCenter.properties.STATE} {urgentCareCenter.properties.ZIP}<br />
          {urgentCareCenter.properties.TELEPHONE}
        </address>
        <Link href={urgentCareCenter.properties.ID + "/schedule-visit"}>
          <pfe-cta priority="primary"><a>Schedule a visit</a></pfe-cta>
        </Link>
        <pfe-cta priority="secondary"><a href={"https://maps.google.com/maps?daddr=" + urgentCareCenter.properties.ADDRESS + " " + urgentCareCenter.properties.CITY + " " + urgentCareCenter.properties.STATE + " " + urgentCareCenter.properties.ZIP}>Get directions</a></pfe-cta>
      </main>

      <Footer />
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`${server}/api/locations/${context.params.lid}`);
  const urgentCareCenter = await res.json();

  return {
    props: {
      urgentCareCenter
    }
  }
}