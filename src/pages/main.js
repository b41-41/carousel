import React from 'react';
import styled from 'styled-components';
import NavBar from '../component/NavBar';
import Slider from '../component/Slider';

const Main = () => {

    const MainDiv = styled.div`
    padding-top: 25px; 
    width: 100%;
    `;

    return (
        <>
            <NavBar />
            <MainDiv>
                <Slider />
            </MainDiv>
        </>
    );
};

export default Main;