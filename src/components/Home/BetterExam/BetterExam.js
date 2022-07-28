// @ts-nocheck
import React from 'react';
// @ts-ignore
import img from '../../../images/onlineExam/img5.jfif';
// @ts-ignore
import bgImg from '../../../images/homeBg.PNG';
import './BetterExam.css';
import { Link } from 'react-router-dom';
import Typed from 'react-typed';

const BetterExam = () => {
  return (
    <div
      className="better-exam-wrapper"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="container-85 better-exam">
        <div className="img-part">
          <img src={img} alt="online exam" />
        </div>
        <div className="better-exam-card">
          <h1 className="better-exam-title">Exam Better Together</h1>
          <h5>Manage your classroom. Engage your students.</h5>
          {/* <h5><span>Safe. Simple. Free.</span></h5> */}
          <Typed
            className="typed-text"
            strings={['Safe', 'Simple', 'Free']}
            typeSpeed={80}
            backSpeed={120}
            loop
          />
          <br />
          <Link className="btn btn-warning  better-exam-btn p-2" to="/login">
            Sign up for a free account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BetterExam;
