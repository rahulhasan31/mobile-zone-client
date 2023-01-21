import React, { useState } from 'react';
import img from '../../assets/images/Product presentation.gif'
import image from '../../assets/images/Virtual reality.gif'
const ExtraBanner = () => {
    
    return (
        <div className='mt-5 '>
            
            <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={img} className="rounded-lg lg:w-1/2 " alt='' />
                <div>
                    <h1 className="text-5xl font-bold">MOBILE ZONE!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    
                </div>
            </div>
        </div>
    
      </div>
    );
};

export default ExtraBanner;