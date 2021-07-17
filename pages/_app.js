import React, { Fragment } from 'react';
import '../styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import { Provider } from 'next-auth/client';
import { wrapper } from 'src/redux/store';
import Layout from 'src/components/layout/Layout'
import ClientSideAuthGuard from 'src/components/clientSideAuthGuard/ClientSideAuthGuard';

const App = ({ Component, pageProps }) => {

    return (
        <Fragment>
            <Provider session={pageProps.session}>
                <Layout>
                    {Component.isRequiredClientSideAuthGuard ?
                        (<ClientSideAuthGuard>
                            <Component {...pageProps} />
                        </ClientSideAuthGuard>)
                        :
                        (<Component {...pageProps} />)
                    }
                </Layout>
            </Provider>
        </Fragment>
    );
};

export default wrapper.withRedux(appWithTranslation(App));
