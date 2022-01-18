import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BannerData } from './BannerData';
import styled from 'styled-components';
import '../css/slider.css';
import useInterval from '../hooks/useInterval';

const Slider = () => {
    const [currentBannerNumber, setCurrentBannerNumber] = useState(1);
    const [browserWidth, setBrowserWidth] = useState(window.innerWidth);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
    const [intervalState, setIntervalState] = useState(true);

    const slideRef = useRef();

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

    //페이지 자동 넘김
    useInterval(switchNextBannerNumber, intervalState ? 4000 : null);

    //배너 넓이
    const bannerWidth = () => {
        if (browserWidth > 1200) {
            return 1072;
        } else {
            return (browserWidth * 0.9) + 12;
        }
    }
    console.log(bannerWidth());
    //모든 배너 넓이의 합 (+사이드용 거짓 배너 (왼쪽 1개, 오른쪽 1개))
    const totalBannerWidth = (bannerWidth() * (BannerData.length + 4));

    //배너가 가운데에 위치 했을 때의 translate 값
    const centerBannerPositionValue = () => {
        const lastBannerWidth = (currentBannerNumber + 1) * bannerWidth();
        const lastBannerMargin = (browserWidth - bannerWidth()) / 2;
        const bannerTouchValue = touchStartX - touchEndX;
        if (currentBannerNumber > 1 || currentBannerNumber < BannerData.length) {
            return lastBannerWidth - lastBannerMargin + bannerTouchValue;
        } else {
            return bannerWidth() - lastBannerMargin + bannerTouchValue;
        }

    }

    //배너 이동 function (버튼, 시간 조건으로 사용)
    function switchNextBannerNumber() {
        if (currentBannerNumber === BannerData.length) {
            setCurrentBannerNumber(currentBannerNumber + 1);
            setTimeout(() => {
                slideRef.current.style.transition = 'none';
                setCurrentBannerNumber(1);
            }, 500);
            slideRef.current.style.transition = '0.5s ease transform';
        } else {
            slideRef.current.style.transition = '0.5s ease transform';
            setCurrentBannerNumber(currentBannerNumber + 1);
        }
    }
    function switchPrevBannerNumber() {
        if (currentBannerNumber === 1) {
            setCurrentBannerNumber(currentBannerNumber - 1);
            setTimeout(() => {
                slideRef.current.style.transition = 'none';
                setCurrentBannerNumber(BannerData.length);
            }, 500);
            slideRef.current.style.transition = '0.5s ease transform';
        } else {
            slideRef.current.style.transition = '0.5s ease transform';
            setCurrentBannerNumber(currentBannerNumber - 1);
        }
    }

    // 터치 action
    const CarouselMouseEnter = () => {
        setIntervalState(false);
    }

    const CarouselMouseOver = () => {
        setIntervalState(true);
    }

    const CarouselTouchStart = e => {
        setIsMouseDown(true);
        setTouchStartX(e.changedTouches[0].pageX);
    }

    const CarouselTouchMove = e => {
        if (!isMouseDown) return;
        e.preventDefault();
        setTouchEndX(e.changedTouches[0].pageX);
    }
    const CarouselMouseDown = e => {
        setIsMouseDown(true);
        setTouchStartX(e.pageX);
    }

    const CarouselMouseMove = e => {
        if (!isMouseDown) return;
        e.preventDefault();
        setTouchEndX(e.pageX);
    }

    const CarouselTouchEnd = () => {
        setIsMouseDown(false);
        const touchMoveDistance = touchStartX - touchEndX;
        if (touchMoveDistance > 120) {
            switchNextBannerNumber();
        } else if (touchMoveDistance < -120) {
            switchPrevBannerNumber();
        }

        //초기화
        setTouchStartX(0);
        setTouchEndX(0);

    }
    const CarouselTouchCancel = () => {
        setIsMouseDown(false);
        const touchMoveDistance = touchStartX - touchEndX;
        if (touchMoveDistance > 120) {
            switchNextBannerNumber();
        } else if (touchMoveDistance < -120) {
            switchPrevBannerNumber();
        }

        //초기화
        setTouchStartX(0);
        setTouchEndX(0);
    }

    //Style
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
    const bannerLastObj2 = BannerData[BannerData.length - 2];
    const bannerLastObj = BannerData[BannerData.length - 1];
    const bannerFirstObj = BannerData[0];
    const bannerFirstObj2 = BannerData[1];
    const buttonDisplay = browserWidth <= 1200 ? 'display: none;' : null;

    //slide 값
    const carouselWidth = bannerWidth() - 12;
    const carouselHeight = () => {
        if (browserWidth > 1200) {
            return 300;
        } else {
            return 183;
        }
    }

    return (
        <>
            <section
                className="slider-box"
                onTouchStart={CarouselTouchStart}
                onTouchEnd={CarouselTouchEnd}
                onTouchMove={CarouselTouchMove}
                onTouchCancel={CarouselTouchCancel}
                onMouseDown={CarouselMouseDown}
                onMouseUp={CarouselTouchEnd}
                onMouseMove={CarouselMouseMove}
                onMouseLeave={CarouselTouchCancel}
                onMouseEnter={CarouselMouseEnter}
                onMouseOver={CarouselMouseOver}
            >
                <div
                    className="slider"
                    style={{
                        width: totalBannerWidth + 'px',
                        transform: `translate(-${centerBannerPositionValue()}px, 0px)`,
                    }}
                    ref={slideRef}
                >
                    {/* fakeLastBanner */}
                    <div className="carousel_slide" data-index={BannerData.length} aria-hidden="true" width={carouselWidth} height={carouselHeight()}>
                        <Link to={bannerLastObj2.link}><a>
                            <img src={bannerLastObj2.image} alt={bannerLastObj2.title} className="carousel_image" width={carouselWidth} />
                            <CarouselOpacityBlock width={carouselWidth} height={carouselHeight()} /></a>
                        </Link>
                    </div>
                    <div className="carousel_slide" data-index={BannerData.length} aria-hidden="true" width={carouselWidth} height={carouselHeight()}>
                        <Link to={bannerLastObj.link}>
                            <img src={bannerLastObj.image} alt={bannerLastObj.title} className="carousel_image" width={carouselWidth} />
                            <CarouselOpacityBlock width={carouselWidth} height={carouselHeight()} />
                        </Link>
                    </div>
                    {BannerData.map((slide, index) => {
                        return (
                            <div className={currentBannerNumber === index + 1 ? 'carousel_slide_active' : 'carousel_slide'} data-index={index} key={index} aria-hidden="true">
                                <Link to={slide.link}>
                                    <img src={slide.image} alt={slide.title} className="carousel_image" width={carouselWidth} />
                                    {currentBannerNumber === index + 1 ?
                                        <div className="carousel_slide_information">
                                            <h2>{slide.title}</h2>
                                            <h3>{slide.content}</h3>
                                            <hr />
                                            <div className="carousel_link" href={slide.link}>
                                                바로가기 &#62;
                                            </div>
                                        </div> : null
                                    }
                                    {currentBannerNumber === index + 1 ?
                                        null : <CarouselOpacityBlock width={carouselWidth} height={carouselHeight()} />}
                                </Link>
                            </div>
                        )
                    })}
                    {/* fakeFirstBanner */}
                    <div className="carousel_slide" data-index={1} aria-hidden="true" width={carouselWidth} height={carouselHeight()}>
                        <Link to={bannerLastObj.link}>
                            <img src={bannerFirstObj.image} alt={bannerFirstObj.title} className="carousel_image" width={carouselWidth} />
                            <CarouselOpacityBlock width={carouselWidth} height={carouselHeight()} />
                        </Link>
                    </div>
                    <div className="carousel_slide" data-index={1} aria-hidden="true" width={carouselWidth} height={carouselHeight()}>
                        <Link to={bannerLastObj2.link}>
                            <img src={bannerFirstObj2.image} alt={bannerFirstObj2.title} className="carousel_image" width={carouselWidth} />
                            <CarouselOpacityBlock width={carouselWidth} height={carouselHeight()} />
                        </Link>
                    </div>
                </div>
            </section>
            <LeftButton onClick={switchPrevBannerNumber} display={buttonDisplay}>&lt;</LeftButton>
            <RightButton onClick={switchNextBannerNumber} display={buttonDisplay}>&gt;</RightButton>
        </>
    )
};

export default Slider;