import React, { useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link';
import { allClass } from 'src/constants/customHooks/customModuleClassMethod';
import mdl from './NavbarMenu.module.scss'
import { useTranslation } from 'next-i18next'
import Cookies from 'js-cookie';
// import { changi18nextLanguage } from 'src/utils/locales/languageConstants';
import { useSession, signOut } from 'next-auth/client';
import { useDispatch, useSelector } from 'react-redux'
import { clientSideAuthGuardAction } from 'src/redux/globalClientState_redux/globalClientState_actions'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

import united_states from 'public/flag/united_states.svg'


function NavbarMenu(props) {
    const [session, loading] = useSession();

    const router = useRouter()
    const { t } = useTranslation('navbarMenu')


    let dispatch = useDispatch()
    const reducerState = useSelector(
        (state) => (state)
    );
    let isAuthenticated = reducerState.globalClientStateReducer.isAuthenticated



    // console.log("router.pathname", router.pathname)
    const changi18nextLanguage = (lang) => {
        return router.push(router.pathname, router.pathname, { locale: lang })
    }


    const handleSignOut = () => {
        Cookies.remove('nextJWT');
        dispatch(clientSideAuthGuardAction(null))
        router.replace(`/user/signin`)
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">NextJs</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link href='/' >
                            <div className={allClass("", "link", mdl)}>
                                {t("home")}
                            </div>
                        </Link>
                        <Link href='/about'>
                            <div className={allClass("", "link", mdl)}>
                                <div className={allClass("", "link", mdl)}>{t("about")}</div>
                            </div>
                        </Link>
                        {isAuthenticated &&
                            <Link href='/images'>
                                <div className={allClass("", "link", mdl)}>
                                    <div className={allClass("", "link", mdl)}>{t("images")}</div>
                                </div>
                            </Link>
                        }

                    </Nav>
                    <Nav>
                        <NavDropdown title={t("languages")} id="collasible-nav-dropdown">
                            <NavDropdown.Item>
                                <div onClick={() => changi18nextLanguage("en")} >
                                    <Image src={united_states} alt='English' height={30} width={50} />
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <div onClick={() => changi18nextLanguage("hi")} >
                                    <Image src="/flag/india.svg" alt='हिंदी' height={30} width={50} />
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <div onClick={() => changi18nextLanguage("chi")} >
                                    <Image src="/flag/china.svg" alt='中国人' height={30} width={50} />
                                </div>
                            </NavDropdown.Item>
                        </NavDropdown>
                        {isAuthenticated &&
                            <NavDropdown title={t("Task")} className={allClass("", "nav_dropdown", mdl)} id="collasible-nav-dropdown">
                                <NavDropdown.Item>
                                    <Link href='/task/ssr/retrieve'>
                                        <div className={allClass("", "linkBlack", mdl)}>
                                            {t("retrieve task")}
                                        </div>
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link href='/task/ssg/retrieve'>
                                        <div className={allClass("", "linkBlack", mdl)}>
                                            {t("static retrieve task")}
                                        </div>
                                    </Link>

                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    <Link href='/task/ssg/create'>
                                        <div className={allClass("", "linkBlack", mdl)}>
                                            {t("create task")}
                                        </div>
                                    </Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                        }
                        <NavDropdown title={t("Users")} className={allClass("", "nav_dropdown", mdl)} id="collasible-nav-dropdown">
                            {isAuthenticated ?
                                (<Fragment>
                                    <NavDropdown.Item>
                                        <Link href='/user/profile'>
                                            <div className={allClass("", "linkBlack", mdl)}>
                                                {t("User Profile")}
                                            </div>
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Link href='/user/update'>
                                            <div onClick={() => handleSignOut()} className={allClass("", "linkBlack", mdl)}>
                                                {t("Log Out")}
                                            </div>
                                        </Link>
                                    </NavDropdown.Item>
                                </Fragment>)
                                :
                                (<Fragment>
                                    <NavDropdown.Item>
                                        <Link href='/user/signin'>
                                            <div className={allClass("", "linkBlack", mdl)}>
                                                {t("Login")}
                                            </div>
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Link href='/user/create'>
                                            <div className={allClass("", "linkBlack", mdl)}>
                                                {t("Create User")}
                                            </div>
                                        </Link>
                                    </NavDropdown.Item>
                                </Fragment>)
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div >
    )
}

export default NavbarMenu
