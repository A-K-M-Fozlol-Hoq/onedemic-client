import React from "react";
// @ts-ignore
import img1 from "../../../images/onlineExam/img1.jfif";
// @ts-ignore
import img2 from "../../../images/onlineExam/img2.jfif";
import img3 from "../../../images/onlineExam/img3.png";
// import img4 from "../../../images/onlineExam/img4.jpg";
import "./HeaderSlide.css";

const Header = () => {
  return (
    <div>
      {/* <img src={img1} alt="" />
      <br></br>
      <img src={img2} alt="" />
      <br></br>
      <img src={img3} alt="" />
      <br></br>
      <img src={img4} alt="" />
      <br></br> */}
      <div className="row header-slide">
        <div
          id="carouselExampleDark"
          className="carousel carousel-dark slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="2000">
              <img src={img1} className="d-block w-100" alt="..."></img>
              <div className="carousel-caption d-none d-md-block">
                <h5 className="slide-header">
                  The Best Quiz Maker for Business and Education
                </h5>
                <p className="slide-text">
                  Onedemic's secure, professional web-based Quiz maker is an
                  easy-to-use, customizable online testing solution for
                  business, training and educational assessments with Tests and
                  Quizzes graded instantly, saving hours of paperwork!
                </p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src={img2} className="d-block w-100" alt="..."></img>
              <div className="carousel-caption d-none d-md-block">
                <h5 className="slide-header">Secure Online Onedemic</h5>
                <p className="slide-text">
                  Onedemic's hosted Online Testing software provides the best
                  Quiz maker tool in 2021 for both Teachers and Businesses. Used
                  globally for business and enterprise training Tests,
                  pre-employment assessments, online certifications and
                  compliance, recruitment, health and safety quizzes, schools,
                  universities, distance learning, lead generation, GDPR and
                  CCPA compliance, online courses, E-Learning, practice Tests
                  and more.
                </p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src={img3} className="d-block w-100" alt="..."></img>
              <div className="carousel-caption d-none d-md-block">
                <h5 className="slide-header">Business and Education plans</h5>
                <p className="slide-text">
                  We've created affordable Online Testing Plans to suit every
                  organization. From occasional Testing to Enterprise Quiz Maker
                  requirements, ClassMarker is your Secure and reliable exam maker
                  and online testing solution. You can also Test 1,000s of Users
                  simultaneously with Onedemic.
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
