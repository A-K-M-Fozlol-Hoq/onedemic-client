import React from "react";
import { Link } from "react-router-dom";
import img from "../../../images/onlineExam/img4.jpg";
import "./BestOnlineExam.css";


const BestOnlineExam = () => {
  return (
    <div className="container-85 best-online-exam">
      <div className="card-part">
        <div className="best-exam-card">
          <h1>The Best Online Exam Website. </h1>
          <p>
            Onedamic secure, professional web-based Quiz maker is an
            easy-to-use, customizable online testing solution for business,
            training and educational assessments with Tests and Quizzes graded
            instantly, saving hours of paperwork!
          </p>
          {/* <button className='btn btn-success best-exam-btn'>Register Free</button> */}
          <Link className='btn btn-success best-exam-btn p-2' to='/login'>Register Free</Link>
        </div>
      </div>
      <div className="img-part">
        <img src={img} alt="" />
      </div>
    </div>
  );
};


export default BestOnlineExam;
