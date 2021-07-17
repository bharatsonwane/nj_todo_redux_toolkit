import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { retrievePdfActions } from 'src/redux/puppetter_redux/puppetter_action';
import { getAllEvents } from 'server/data/dummy-data'
import { Table } from 'react-bootstrap';


export default function IndexPage(props) {

  // // ----------Localization hooks & Router Hooks-------------
  const router = useRouter();
  const { t } = useTranslation('indexPage')


  // // ----------redux store useDispatch & useSelector --------------------
  const dispatch = useDispatch()
  const reducerState = useSelector(
    (state) => (state)
  );

  function handleDetailsClick(o) {
    router.push(`/${o.demoId}`)

  }

  const handlePrintPdf = async () => {
    let urlLink = { urlForPdf: 'http://localhost:3000/' }
    dispatch(retrievePdfActions(urlLink))
  }

  return (
    <Fragment>
      <Head>
        <title>{t("Home")}</title>
        <meta name="description" content={t("NextJs Todo Application by using redux toolkit")} />
      </Head>

      <div style={{ margin: 40 }}>
        <h4>{t("Demo Lectures on Programming Skills")}</h4>
        <br></br>
        <button onClick={() => handlePrintPdf()}> Print Pdf</button>
        <div style={{ margin: 20 }}>
          <Table style={{ tableLayout: 'auto', fontSize: 13, marginLeft: 30, marginRight: 30 }} striped hover responsive="lg">
            <thead >
              <tr style={{ backgroundColor: '#264855', color: 'white' }}>
                <th>{t("DemoId")}</th>
                <th>{t("Title")}</th>
                <th>{t("Date")}</th>
                <th>{t("Location")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {props.allEvents.map((o, index) => (
                <tr key={o.demoId}>
                  <td>{o.demoId}</td>
                  <td>{o.title}</td>
                  <td>{o.date}</td>
                  <td>{o.location}</td>
                  <td style={{ cursor: 'pointer', color: 'blue' }} onClick={(e) => handleDetailsClick(o)}>{t("View Details")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Fragment>
  );
}

export async function getStaticProps({ locale }) {
  const allEvents = await getAllEvents();
  return {
    props: {
      ...(await serverSideTranslations(locale, ['navbarMenu', 'indexPage'])),
      allEvents: allEvents
    },
  }

}

