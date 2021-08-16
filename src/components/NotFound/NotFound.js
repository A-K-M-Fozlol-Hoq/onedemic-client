import React from 'react';
import "./NotFound.css";

const NotFound = () => {
    return (
        <div className="error-page">
            <div id="error-page" className=" p-5 rounded">
                <div className="content">
                    <h2 className="header" data-text="404">
                    404
                    </h2>
                    <h4 data-text="Opps! Page not found">
                    Opps! Page not found
                    </h4>
                    <p>
                    Sorry, the page you're looking for doesn't exist. If you think something is broken, report a problem.
                    </p>
                    <div className="btns">
                    <a href="/">return home</a>
                    <a href="/dashboard">Dashboard</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;