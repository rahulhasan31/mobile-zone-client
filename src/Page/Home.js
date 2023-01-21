import React from 'react';
import Banner from './Banner/Banner';
import Categories from './Categories/Categories';
import ExtraBanner from './ExtraBanner/ExtraBanner';
import Highlight from './Highlight/Highlight';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <ExtraBanner></ExtraBanner>
            <Highlight></Highlight>
        </div>
    );
};

export default Home;