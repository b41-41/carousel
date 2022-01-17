import React, { useState, useEffect, useRef } from 'react';
import { BannerData } from './BannerData';
import styled from 'styled-components';
import '../css/slider.css';
import useInterval from '../hooks/useInterval';

const Slider = () => {
    const [currentBannerNumber, setCurrentBannerNumber] = useState(1);
    const [browserWidth, setBrowserWidth] = useState(window.innerWidth);
    const [touchWalk, setTouchWalk] = useState(0);
    const carouselRef = useRef();
    const sliderRef = useRef();

    //브라우저 크기 변경 시 레이아웃 리사이즈
    const handleResize = () => {
        setBrowserWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [browserWidth]);

    useEffect(() => {
        if (touchWalk < -100) {
            setTouchWalk(0)
            switchNextBannerNumber()
        } else if (touchWalk > 100) {
            setTouchWalk(0)
            switchPrevBannerNumber()
        }
    }, [touchWalk])

    //페이지 자동 넘김
    useInterval(switchNextBannerNumber, 4000);

    //배너 넓이
    const bannerWidth = () => {
        if (browserWidth > 1200) {
            return 1072;
        } else {
            return browserWidth * 0.9;
        }
    }
    //모든 배너 넓이의 합 (+사이드용 거짓 배너 (왼쪽 2개, 오른0쪽 2개))
    const totalBannerWidth = (bannerWidth() * (BannerData.length + 2));

    //배너가 가운데에 위치 했을 때의 translate 값
    const centerBannerPositionValue = () => {
        const lastBannerWidth = (currentBannerNumber) * bannerWidth();
        const lastBannerMargin = (browserWidth - bannerWidth()) / 2;
        return lastBannerWidth - lastBannerMargin - touchWalk;
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

    // 터치 action
    let isMouseDown = false;
    let startX, scrollLeft;

    const CarouselTouchStart = e => {
        isMouseDown = true;

        startX = e.pageX - carouselRef.current.offsetLeft;
        scrollLeft = carouselRef.current.scrollLeft;

    }
    const CarouselTouchMove = e => {
        if (!isMouseDown) return;

        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX) * 1;
        // carouselRef.current.scrollLeft = scrollLeft - walk;
        console.log(walk);
        setTouchWalk(-walk);

    }
    const CarouselTouchEnd = () => {
        isMouseDown = false;
        carouselRef.current.scrollLeft = 0;
        setTouchWalk(0);
    }
    const CarouselTouchCancel = () => {
        isMouseDown = false;
        carouselRef.current.scrollLeft = 0;
        setTouchWalk(0);
    }


    useEffect(() => {
        carouselRef.current.addEventListener('touchstart', CarouselTouchStart);
        carouselRef.current.addEventListener('touchend', CarouselTouchEnd);
        carouselRef.current.addEventListener('touchmove', CarouselTouchMove);
        carouselRef.current.addEventListener('touchcancel', CarouselTouchCancel);
        carouselRef.current.addEventListener('mousedown', CarouselTouchStart);
        carouselRef.current.addEventListener('mouseup', CarouselTouchEnd);
        carouselRef.current.addEventListener('mousemove', CarouselTouchMove);
        carouselRef.current.addEventListener('mouseleave', CarouselTouchCancel);
    }, [])

    //캐러셀 div 값 (useRef)
    useEffect(() => {
        sliderRef.current.style.width = totalBannerWidth + 'px';
        sliderRef.current.style.transform = `translate(-${centerBannerPositionValue()}px, 0px)`
    }, [currentBannerNumber, browserWidth])

    //캐러셀 Style값 (styled-components)

    const LeftButton = styled.button`
        ${props => props.display}
        position: absolute;
        top: 195px;
        width: 30px;
        height: 60px;
        opacity: .5;
        border-radius: 15px;
        background-color: #fff;
        font-size: 16px;;
        left: calc((100% - 1210px) / 2);
        `;

    const RightButton = styled.button`
        ${props => props.display}
        position: absolute;
        top: 195px;
        width: 30px;
        height: 60px;
        opacity: .5;
        border-radius: 15px;
        background-color: #fff;
        font-size: 16px;
        right: calc((100% - 1200px) / 2);
    `;

    const CarouselOpacityBlock = styled.div`
        z-index: 100;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        width: ${props => props.width}px;
        height: ${props => props.height}px;
        left: 6px;
        top: 0;
    `;

    //Fake 배너 값
    const bannerFirstObj = BannerData[0];
    const bannerLastObj = BannerData[BannerData.length - 1];
    const buttonDisplay = browserWidth <= 1200 ? 'display: none;' : null;

    return (
        <>
            <section className="slider-box" ref={carouselRef}>
                <div className="slider" ref={sliderRef}>
                    {/* fakeLastBanner */}
                    <a href={bannerLastObj.link}>
                        <div className="carousel_slide" data-index={BannerData.length} aria-hidden="true">
                            <img src={bannerLastObj.image} alt={bannerLastObj.title} className="carousel_image" />
                            <CarouselOpacityBlock width={bannerWidth() - 12} height={browserWidth > 1200 ? 300 : 183} />
                        </div>
                    </a>
                    {BannerData.map((slide, index) => {
                        return (
                            <a href={slide.link}>
                                <div className={currentBannerNumber === index + 1 ? 'carousel_slide_active' : 'carousel_slide'} data-index={index} aria-hidden="true">
                                    <img src={slide.image} alt={slide.title} className="carousel_image" />
                                    {currentBannerNumber === index + 1 ?
                                        <div className="carousel_slide_information">
                                            <h2>{slide.title}</h2>
                                            <h3>{slide.content}</h3>
                                            <hr />
                                            <a className="carousel_link" href={slide.link}>
                                                바로가기 &#62;
                                            </a>
                                        </div> : null
                                    }
                                    {currentBannerNumber === index + 1 ?
                                        null : <CarouselOpacityBlock width={bannerWidth() - 12} height={browserWidth > 1200 ? 300 : 183} />}
                                </div>
                            </a>
                        )
                    })}
                    {/* fakeFirstBanner */}
                    <a href={bannerFirstObj.link}>
                        <div className="carousel_slide" data-index={1} aria-hidden="true">
                            <img src={bannerFirstObj.image} alt={bannerFirstObj.title} className="carousel_image" />
                            <CarouselOpacityBlock width={bannerWidth() - 12} height={browserWidth > 1200 ? 300 : 183} />
                        </div>
                    </a>
                </div>
            </section>
            <LeftButton onClick={switchPrevBannerNumber} display={buttonDisplay}>&lt;</LeftButton>
            <RightButton onClick={switchNextBannerNumber} display={buttonDisplay}>&gt;</RightButton>
            {/* <div style={{ position: 'fixed', top: 600 + 'px' }}>{startX}rkskskdfdsk{walk}</div> */}
        </>
    )
};

export default Slider;