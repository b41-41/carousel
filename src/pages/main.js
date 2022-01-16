import React from 'react';
import NavBar from '../component/NavBar';
import Slider from '../component/Slider';

const Main = () => {

    return (
        <>
            <NavBar />
            <div className='mainDiv' style={{ paddingTop: '25px', width: `100%` }}>
                <Slider />
            </div>
        </>
    );
};

export default Main;