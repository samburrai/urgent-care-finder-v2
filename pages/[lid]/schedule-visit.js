import Head from 'next/head'
import Script from 'next/script'
import { useRef, useState } from 'react'
import Footer from '../../components/footer'
import Navigation from '../../components/navigation'
import { server } from '../../config'
import styles from '../../styles/ScheduleVisit.module.css'

export default function ScheduleVisit({ urgentCareCenter, dates }) {
  const dialogRef = useRef(null);
  const [appointmentTime, setAppointmentTime] = useState({
    title: null
  });

  const schedule = (appointment) => {
    setAppointmentTime(appointment);
    dialogRef.current.showModal();
  };

  const closeModal = () => {
    dialogRef.current.close();
  }

  return (
    <div>
      <Head>
        <title>NC Urgent Care Finder - Schedule Visit</title>
        <meta name="description" content="NC Urgent Care Finder - Schedule Visit" />
      </Head>

      <Script type="module" src="https://unpkg.com/@patternfly/pfe-datetime@1.12.3/dist/pfe-datetime.min.js" />
      <Script type="module" src="https://unpkg.com/@patternfly/pfe-cta@1.12.3/dist/pfe-cta.min.js" />
      <Script type="module" src="https://unpkg.com/@patternfly/pfe-button@1.12.3/dist/pfe-button.min.js" />
      <Script type="module" src="https://unpkg.com/@patternfly/pfe-icon@1.12.3/dist/pfe-icon.min.js" />

      <Navigation />

      <main>
        <div className={styles.flex}>
          <div className={styles.times}>
            <section>
              <h1>Schedule a visit</h1>
              <h2>{urgentCareCenter.properties.NAME}</h2>
            </section>
            {dates.map(date => (
              <section key={date.date}>
                <h3>
                  <pfe-datetime 
                    type="local"
                    day="numeric"
                    month="long"
                    year="numeric"
                    datetime={new Date(date.date)}>
                  </pfe-datetime>
                </h3>
                <ul className={styles.list}>
                  {date.appointmentSlots.map(appointment => (
                    <li key={appointment.date}>
                      <button className={styles.button} onClick={() => schedule(appointment)}>
                        <pfe-datetime
                          type="local"
                          hour="numeric"
                          minute="numeric"
                          datetime={new Date(appointment.date)}>
                        </pfe-datetime>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <section className={styles.details}>
            <address>
              {urgentCareCenter.properties.ADDRESS}<br />
              {urgentCareCenter.properties.CITY}, {urgentCareCenter.properties.STATE} {urgentCareCenter.properties.ZIP}<br />
              {urgentCareCenter.properties.TELEPHONE}
            </address>
            <h3>Hours</h3>
            <p>Mon - Sun: 8:00 am to 8:00 pm</p>
            <pfe-cta><a href={"https://maps.google.com/maps?daddr=" + urgentCareCenter.properties.ADDRESS + " " + urgentCareCenter.properties.CITY + " " + urgentCareCenter.properties.STATE + " " + urgentCareCenter.properties.ZIP}>Get directions</a></pfe-cta>
          </section>
        </div>
        <dialog ref={dialogRef}>
          <button className={styles.closeModalButton} onClick={closeModal}>
            <pfe-icon icon="web-icon-close"></pfe-icon>
          </button>
          <h2>In clinic urgent care visit</h2>
          <h3>{urgentCareCenter.properties.NAME}</h3>
          <p>
            <pfe-icon size="3x" icon="rh-icon-clock"></pfe-icon>
            <pfe-datetime
              type="local"
              day="numeric"
              month="long"
              year="numeric"
              hour="numeric"
              minute="numeric"
              datetime={new Date(appointmentTime.date)}>
            </pfe-datetime>
          </p>
          <address className="push-bottom">
            {urgentCareCenter.properties.ADDRESS}<br />
            {urgentCareCenter.properties.CITY}, {urgentCareCenter.properties.STATE} {urgentCareCenter.properties.ZIP}<br />
            {urgentCareCenter.properties.TELEPHONE}
          </address>
          <textarea className={styles.textarea} placeholder='What is the nature of the visit?'></textarea>
          <pfe-button class="push-right" variant="primary"><button>Schedule as guest</button></pfe-button>
          <pfe-button variant="secondary" onClick={closeModal}><button>Cancel</button></pfe-button>
        </dialog>
      </main>

      <Footer />
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`${server}/api/locations/${context.params.lid}`);
  const urgentCareCenter = await res.json();

  const date = new Date();
  const today = new Date().setDate(date.getDate());
  const tomorrow = new Date().setDate(date.getDate() + 1);
  const dayAfterNext = new Date().setDate(date.getDate() + 2);
  const dates = [
    { date: today, appointmentSlots: [] },
    { date: tomorrow, appointmentSlots: [] },
    { date: dayAfterNext, appointmentSlots: [] },
  ];
  const appointmentSlots = 45;

  dates.forEach(date => {
    const _date = new Date(date.date);
    let appointmentTime = new Date(_date.setHours(8, 30, 0));

    let i = 0;
    while(i < appointmentSlots) {
      const appointment = {
        date: appointmentTime.toString()
      };

      date.appointmentSlots.push(appointment);
      appointmentTime.setMinutes(appointmentTime.getMinutes() + 15);
      i++;
    }
  });

  return {
    props: {
      urgentCareCenter,
      dates,
    }
  }
}