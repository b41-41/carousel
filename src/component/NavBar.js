import React from 'react';
import { Link } from 'react-router-dom';
import menuImg from '../images/icon-menu.png';
import logoImg from '../images/logo.png';
import searchImg from '../images/search.png';
import dotImg from '../images/dots.png';
import '../css/navBar.css';

const NavBar = () => {
    return (
        <>
            <div className="NavBar_ClassName">
                <div className="MainBar_MainBar">
                    <div className="MainBar_MainBar_nav">
                        <div className="MainBar_MainBar_nav_top">
                            <div className="Mainbar_Mainbar_nav_top_logo">
                                <button className="MainBar_hamberger" type="button"><img src={menuImg} alt="menu" width="17px" height="14px" /></button>
                                <Link to="/"><img src={logoImg} alt="logo" width="75px" height="17px" /></Link>
                            </div>
                            <button className="xsSignUpButton" type="button">회원가입하기</button>
                        </div>
                        <ul className="Menu_className">
                            <li className='Menu_className_home'><Link to="/">홈</Link></li>
                            <li><Link to="/jobsfeed">채용</Link></li>
                            <li><Link to="/events">이벤트</Link></li>
                            <li className="Menu_className_option"><Link to="/salary">직군별 연봉</Link></li>
                            <li className="Menu_className_option"><Link to="/cv/intro">이력서</Link></li>
                            <li className="Menu_className_option_new"><Link to="/community">커뮤니티</Link><em>New</em></li>

                            <li className="Menu_className_option"><Link to="/">프리랜서</Link></li>
                            <li className="Menu_className_option_beta"><Link to="aiscore/resume">AI 합격예측<em>Beta</em></Link></li>

                        </ul>
                        <aside className="Aside_className">
                            <ul>
                                <li>
                                    <button className="searchButton" type="button"><img src={searchImg} alt="search" height="15px" width="15px" />
                                    </button>
                                    <button className="menuButton" type="button"><img src={dotImg} alt="menu" width="18px" height="18px" /></button>
                                </li>
                                <li>
                                    <button className="signUpButton" type="button">회원가입/로그인</button>
                                </li>
                                <li className="mdMoreVisible">
                                    <div className="before_line"></div>
                                    <a className="dashboardButton" href="/dashboard">기업 서비스</a>
                                </li>
                            </ul>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;