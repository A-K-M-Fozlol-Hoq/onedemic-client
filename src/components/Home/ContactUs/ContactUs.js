import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us-wrapper">
      <div className="contact">
        <h1>Contact With Us</h1>
        <div className="divider"></div>
        <form action="" className="contact-form">
          <label className="text-info" htmlFor="name">
            First Name:{' '}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name.."
          ></input>
          <label className="text-info" htmlFor="email">
            Last Name:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email.."
          ></input>
          <label className="text-info" htmlFor="subject">
            Subject:
          </label>
          <br />
          <textarea
            id="subject"
            name="subject"
            placeholder="Write something.."
          ></textarea>
          <input
            type="submit"
            value="Submit"
            onClick={(e) => e.preventDefault()}
          ></input>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
