import React from "react";

const NotFound = () => {
    console.log("NotFound")
    return (
        <div>
            <head>
                <title>404 Not Found</title>
            </head>
            <body2>
            <div className="container">
                <h1>404 Not Found</h1>
                <p>Sorry, the page you requested could not be found.</p>
                <p>Please check the URL and try again or go back to the <a href="/">homepage</a>.</p>
            </div>
            </body2>
        </div>
    )
        ;
};

export default NotFound;