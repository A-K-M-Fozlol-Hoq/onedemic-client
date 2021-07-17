import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="row container-85 footer-container">
        <div className="col-md-3">
          <h5 className="text-info">PRODUCTS</h5>
          <p>Acceptable use policy generator</p>
          <p>Cookie consent banner plugin</p>
          <p>DMCA policy generator</p>
        </div>
        <div className="col-md-3">
          <h5 className="text-info">COMPANY</h5>
          <p>About us</p>
          <p>Contact us</p>
          <p>Blog</p>
          <p>Testimonials</p>
        </div>
        <div className="col-md-3">
          <h5 className="text-info">RESOURCES</h5>
          <p>Bundle and save</p>
          <p>Pricing</p>
          <p>Affiliates</p>
          <p>Partners</p>
        </div>
        <div className="col-md-3">
          <h5 className="text-info">FOLLOW US</h5>
          <p>Facebook</p>
          <p>Twitter
</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
