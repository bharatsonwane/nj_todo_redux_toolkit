import React, { Fragment, useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import CustomLoader from '../loadingIndicator/CustomLoader';
import { ToastContainer } from 'react-toastify';
import NavbarMenu from '../navbarMenu/NavbarMenu';
import { clientSideAuthGuardAction } from 'src/redux/globalClientState_redux/globalClientState_actions';


function Layout(props) {
  const dispatch = useDispatch()


  const getCookies = async () => {
    let userToken = Cookies.get("nextJWT");
    return await userToken
  }
  useEffect(async () => {
    let cookies = await getCookies()
    if (cookies) {
      dispatch(clientSideAuthGuardAction(cookies))
    }
  }, [])


  return (
    <Fragment>
      <CustomLoader />
      <ToastContainer />
      <NavbarMenu />

      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
