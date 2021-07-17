import React, { Fragment } from 'react'
import Head from 'next/head';
import Image from 'next/image'

import AthleteImg from 'public/images/athlete.jpg'
import Bg3Img from 'public/images/bg3.jpg'
import Bg4Img from 'public/images/bg4.jpg'
import Bg6Img from 'public/images/bg6.jpg'


export default function ImagePage() {
    return (
        <Fragment>
            <Head>
                <title>Image</title>
                <meta name="description" content="NextJs Todo Application's Image page." />
            </Head>
            <h3> <strong>Image Optimization</strong> feature of Nextjs.</h3>

            <Image src={AthleteImg} alt="Picture of the author" layout="responsive" />
            <Image src={Bg3Img} alt="Picture of the author" layout="responsive" />
            <Image src={Bg4Img} alt="Picture of the author" layout="responsive" />
            <Image src={Bg6Img} alt="Picture of the author" layout="responsive" />

        </Fragment>
    )
}

 ImagePage.isRequiredClientSideAuthGuard = true