import React from 'react';
import mainImage from '../assets/mainImage.png';

const MainPage = () => {
    return (
        <div style={{marginTop:"-20px", marginLeft:"-23px"}}>
            <span>
                <img src={mainImage}/>
            </span>
        </div>
    );
};

export default MainPage;