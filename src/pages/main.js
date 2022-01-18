import React, { useMemo } from 'react';
import NavBar from '../component/NavBar';
import Slider from '../component/Slider';

const Main = () => {
    const style = useMemo(() => (
        { paddingTop: '25px', width: `100%` }
    ), []);

    return (
        <>
            <NavBar />
            <div className='mainDiv' style={style}>
                <Slider />
            </div>
        </>
    );
};

export default Main;