import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import styles from '../../styles/Home.module.css'
import { server } from "../../config";
import Navigation from '../../components/navigation'
import Footer from '../../components/footer'
import { Loader } from "@googlemaps/js-api-loader"
import { useEffect, useRef, useState } from 'react';

export default function Home({ locations }) {
  const map = useRef(null);
  const infoWindowRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState({
    properties: {}
  });

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyBYKcwvM-cHrNX1EQ0ahuOsrim--K5Hbz4',
      version: 'weekly'
    });
  
    loader.load().then(() => {
      const newMap = new google.maps.Map(map.current, {
        center: { lat: 35.7796, lng: -78.6382 },
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoom: 10,
      });

      const infoWindow = new google.maps.InfoWindow();

      locations.forEach(location => {
        const position = {
          lat: location.geometry.coordinates[1],
          lng: location.geometry.coordinates[0]
        };

        const marker = new google.maps.Marker({
          position,
          map: newMap
        });

        marker.addListener('click', () => {
          setSelectedLocation(location);

          setTimeout(() => {
            infoWindow.setContent(infoWindowRef.current.innerHTML);
            infoWindow.open({
              anchor: marker,
              map: newMap
            });
          }, 0);
        });
      });
    });
  }, [locations, infoWindowRef]);

  return (
    <div className={styles.container}>
      <Head>
        <title>NC Urgent Care Finder</title>
        <meta name="description" content="Urgent Care Finder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script type="module" src="https://unpkg.com/@patternfly/pfe-cta@1.12.3/dist/pfe-cta.min.js" />

      <Navigation />

      <main className={styles.main}>
        <div ref={map} className={styles.map}></div>
        <div className={styles.list}>
          <ul>
            {locations.map(urgentCareCenter => (
              <li key={urgentCareCenter.properties.ID}>
                <Link href={urgentCareCenter.properties.ID} passHref><a><h2>{urgentCareCenter.properties.NAME}</h2></a></Link>
                <address className={styles.address}>
                  {urgentCareCenter.properties.ADDRESS}<br />
                  {urgentCareCenter.properties.CITY}, {urgentCareCenter.properties.STATE} {urgentCareCenter.properties.ZIP}<br />
                  <a href={"tel:" + urgentCareCenter.properties.TELEPHONE}>{urgentCareCenter.properties.TELEPHONE}</a>
                </address>
                <div>
                  <pfe-cta priority="primary"><Link href={urgentCareCenter.properties.ID + "/schedule-visit"} passHref><a>Schedule a visit</a></Link></pfe-cta>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <div ref={infoWindowRef} hidden>
        <h3>{selectedLocation.properties.NAME}</h3>
        <address className={styles.address} style={{marginBottom: "1rem"}}>
          {selectedLocation.properties.ADDRESS}<br />
          {selectedLocation.properties.CITY}, {selectedLocation.properties.STATE} {selectedLocation.properties.ZIP}<br />
          <a href={"tel:" + selectedLocation.properties.TELEPHONE}>{selectedLocation.properties.TELEPHONE}</a>
        </address>
        <div>
          <pfe-cta priority="primary"><Link href={selectedLocation.properties.ID + "/schedule-visit"} passHref><a>Schedule a visit</a></Link></pfe-cta>
        </div>
      </div>
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
