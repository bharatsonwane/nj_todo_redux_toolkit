import { Fragment } from "react";
import Head from 'next/head';
import mdl from 'src/components/task/retrieveDetail/RetrieveDetailTask.module.scss'
import { getEventBydemoId, getAllEvents } from 'server/data/dummy-data'
import { allClass } from "src/helper/customHooks/customModuleClassMethod";


function HomeDetailPage(props) {
    const event = props.selectedEvent;
    return (
        <Fragment>
            <Head>
                <title>{event && event.title ? event.title : "Event Detail"}</title>
                <meta name="description" content={`NextJs Todo Application's Event Detail Page`} />
                {event && event.title && <meta name="description" content={event.title} />}
            </Head>
            <div style={{ margin: 30 }}>
                <h4>Here we are showing all details as per the demoId</h4>
            </div>
            {event &&
                <div className={allClass("", "container", mdl)}>
                    <table className={allClass("", "tableStyle", mdl)} >
                        <tbody>
                            <tr>
                                <th>demoId</th>
                                <td>{event.demoId}</td>
                            </tr>
                            <tr>
                                <th>Title</th>
                                <td>{event.title}</td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>{event.description}</td>
                            </tr>
                            <tr>
                                <th>Location</th>
                                <td>{event.location}</td>
                            </tr>
                            <tr>
                                <th>Date</th>
                                <td>{event.date}</td>
                            </tr>
                            <tr>
                                <th>Image Path</th>
                                <td>{event.image}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </Fragment>
    );
}

export default HomeDetailPage;


export async function getStaticPaths() {
    const events = getAllEvents();
    const demoIds = events.map(ev => ev.demoId)
    const pathsWithParams = demoIds.map(item => ({ params: { demoId: `${item}` } }))
    return {
        paths: pathsWithParams,
        fallback: true, // false or true or 'blocking'
    };
}

export async function getStaticProps(context) {
    const eventdemoId = context.params.demoId;
    const event = getEventBydemoId(eventdemoId);
    return {
        props: {
            selectedEvent: event,
        },
    };
}