import React from 'react';
import menuImg from '../images/icon-menu.png';
import logoImg from '../images/logo.png';
import '../css/navBar.css';

const NavBar = () => {
    return (
        <>
            <div className="MainBar_MainBar">
                <div className="MainBar_MainBar_nav">
                    <div className="MainBar_MainBar_nav_top">
                        <button className="MainBar_hamberger" type="button"><img src={menuImg} alt="menu" width="17px" height="14px" /></button>
                        <a href="/"><img src={logoImg} alt="logo" width="75px" height="17px" /></a>
                    </div>
                    <ul className="Menu_className">
                        <li>채용</li>
                        <li>이벤트</li>
                        <li>직군별 연봉</li>
                        <li>이력서</li>
                        <li>커뮤니티<em>New</em></li>
                        <li>프리랜서</li>
                        <li>AI 합격예측<em>Beta</em></li>
                    </ul>
                    <aside className="Aside_className">
                        <ul>
                            <li>
                                <button clasName="searchButton" type="button">🔍
                                </button>
                            </li>
                            <li>
                                <button className="signUpButton" type="button">회원가입/로그인</button>
                            </li>
                            <li>
                                <a className="dashboardButton" href="/dashboard">기업 서비스</a>
                            </li>
                        </ul>
                    </aside>
                </div>
            </div>
        </>
    );
};

export default NavBar;