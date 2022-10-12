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
        <title>NC Urgent Care Finder - Location</title>
        <meta name="description" content="NC Urgent Care Finder - Location" />
      </Head>

      <Script type="module" src="https://unpkg.com/@patternfly/pfe-cta@1.12.3/dist/pfe-cta.min.js" />

      <Navigation />

      <main>
        <section>
          <h1>{urgentCareCenter.properties.NAME}</h1>
          <address>
            {urgentCareCenter.properties.ADDRESS}<br />
            {urgentCareCenter.properties.CITY}, {urgentCareCenter.properties.STATE} {urgentCareCenter.properties.ZIP}<br />
            {urgentCareCenter.properties.TELEPHONE}
          </address>
        </section>
        <section>
        <pfe-cta priority="primary" class="push-right"><Link href={urgentCareCenter.properties.ID + "/schedule-visit"} passHref><a>Schedule a visit</a></Link></pfe-cta>
        <pfe-cta priority="secondary"><a href={"https://maps.google.com/maps?daddr=" + urgentCareCenter.properties.ADDRESS + " " + urgentCareCenter.properties.CITY + " " + urgentCareCenter.properties.STATE + " " + urgentCareCenter.properties.ZIP}>Get directions</a></pfe-cta>
        </section>
        <section>
          <h2>Open until 8:00 pm</h2>
          <h3>Urgent Care Hours</h3>
          <p>Mon - Sun: 8:00 am to 8:00 pm</p>
        </section>
        <section className="flex complimentary">
          <div>
            <h2>Treatments</h2>
            <ul>
              <li>Sprains, strains &amp; broken bones</li>
              <li>Dislocations</li>
              <li>Cuts, scrapes, wounds, abrasions &amp; burns</li>
              <li>Wound care Urinary tract infections</li>
            </ul>
          </div>
          <div>
            <h2>Services</h2>
            <ul>
              <li>Digital X-rays</li>
              <li>EKG</li>
              <li>Sutures &amp; stitches</li>
              <li>Labs &amp; X-rays</li>
              <li>Physicals Vaccinations &amp; immunizations</li>
            </ul>
          </div>
        </section>
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