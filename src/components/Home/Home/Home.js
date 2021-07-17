import React from 'react';
import BestOnlineExam from '../BestOnlineExam/BestOnlineExam';
import BetterExam from '../BetterExam/BetterExam';
import ContactUs from '../ContactUs/ContactUs';
import HeaderSlide from '../HeaderSlide/HeaderSlide';

const Home = () => {
    return (
        <div>
            <HeaderSlide></HeaderSlide>
            <BestOnlineExam></BestOnlineExam>
            <BetterExam></BetterExam>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;