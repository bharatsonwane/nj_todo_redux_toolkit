import React, { Fragment } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'


function About() {
    const { t } = useTranslation('common')


    return (
        <Fragment>
            <Head>
                <title>About</title>
                <meta name="description" content="NextJs Todo Application's Image page." />
            </Head>

            <div style={{ margin: 30 }}>
                <p>Next.js is an open-source React front-end development web framework created by Vercel that enables functionality such as server-side rendering and generating static websites for React based web applications. It is a production-ready framework that allows developers to quickly create static and dynamic JAMstack websites and is used widely by many large companies.[4] Next.js is one of several recommended toolchains available when starting a new React app, all of which provide a layer of abstraction to aid in common tasks.</p>
                <p>Traditional React apps render all their content in the client-side browser, Next.js is used to extend this functionality to include applications rendered on the server side. The copyright and trademarks for Next.js are owned by Vercel.[5] On July 27, 2020 Next.js version 9.5 was announced, adding new capabilities including incremental static regeneration, rewrites, and redirect support.</p>
                <p>Next.js is a React framework that enables several extra features, including server-side rendering and generating static websites.[6] React is a JavaScript library that is traditionally used to build web applications rendered in the clients browser with JavaScript.[7] Developers recognize several problems with this strategy however, such as not catering to users who do not have access to JavaScript or have disabled it, potential security issues, significantly extended page loading times, and it can harm the sites overall search engine optimization.[7] Frameworks such as Next.js sidestep these problems by allowing some or all of the website to be rendered on the server-side before being sent to the client.</p>
            </div>
        </Fragment>
    )
}

export default About


export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
})