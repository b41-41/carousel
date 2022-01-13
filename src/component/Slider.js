import React, { useState } from 'react';
import { BannerData } from './BannerData';
import '../css/slider.css';

const Slider = () => {
    const [currentBannerNumber, setCurrentBannerNumber] = useState(1);
    let browserWidth = window.innerWidth;
    //배너 넓이
    const bannerWidth = () => {
        if (window.innerWidth > 1080) {
            return 1072;
        } return;
    }
    //모든 배너 넓이의 합 (+사이드용 거짓 배너 (왼쪽 2개, 오른쪽 2개))
    const totalBannerWidth = (bannerWidth() * BannerData.length) + 4;

    //배너가 가운데에 위치 했을 때의 translate 값
    const centerBannerPositionValue = () => {
        const lastBannerWidth = (currentBannerNumber) * bannerWidth();
        const lastBannerMargin = (browserWidth - bannerWidth()) / 2;
        console.log(lastBannerMargin);
        return lastBannerWidth - lastBannerMargin;

    }

    //배너 이동 function (버튼, 시간 조건으로 사용)
    function switchNextBannerNumber() {
        if (currentBannerNumber === BannerData.length) {
            setCurrentBannerNumber(1);
        } else {
            setCurrentBannerNumber(currentBannerNumber + 1);
        }
    }
    function switchPrevBannerNumber() {
        if (currentBannerNumber === 1) {
            setCurrentBannerNumber(BannerData.length);
        } else {
            setCurrentBannerNumber(currentBannerNumber - 1);
        }
    }

    //캐러셀 transform, width 계산
    const slideStyle = {
        width: totalBannerWidth + 'px',
        height: '300px',
        transform: `translate(-${centerBannerPositionValue()}px, 0px)`
    };

    return (
        <>
            <section className="slider-box">
                <div className="slider" style={slideStyle}>
                    {BannerData.map((slide, index) => {
                        return (
                            <div className="carousel_slide" data-index={index} aria-hidden="true">
                                <a href={slide.link}><img src={slide.image} alt={slide.title} /></a>
                                <div className="carousel_slide_information">
                                    <h2>{slide.title}</h2>
                                    <h3>{slide.content}</h3>
                                    <hr />
                                    <a className="carousel_link" href={slide.link}>
                                        바로가기 &#62;
                                    </a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
            <div className="arrow" onClick={switchPrevBannerNumber}> &#60; </div>
            <div className="arrow" onClick={switchNextBannerNumber}> &#62; </div>
            <div>{currentBannerNumber}</div>
        </>
    )
};

export default Slider;