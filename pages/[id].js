import Head from 'next/head'
import { server } from '../config'

export default function Location ({ urgentCareCenter }) {
  return (
    <div>
      <Head>
        <title>Urgent Care Finder - Location</title>
        <meta name="description" content="Urgent Care Finder - Location" />
      </Head>

      <header>
        <nav>
          Urgent Care Finder
        </nav>
      </header>

      <main>
        <h1>Location</h1>
        {urgentCareCenter.properties.NAME}
      </main>

      <footer>Footer</footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`${server}/api/locations/${context.params.id}`);
  const urgentCareCenter = await res.json();

  return {
    props: {
      urgentCareCenter
    }
  }
}