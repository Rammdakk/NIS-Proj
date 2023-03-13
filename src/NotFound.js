import React from "react";

const NotFound = () => {
    document.title = "NotFound"
    console.log("NotFound")
    localStorage.clear()
    return (
        <div>
            <head>
                <title>404 Not Found</title>
            </head>
            <body2>
            <div className="container">
                <h1>404 Not Found</h1>
                <p>Sorry, the page you requested could not be found.</p>
                <p>Please check the URL and try again or go back to the <a href="/">start page</a>.</p>
            </div>
            </body2>
        </div>
    )
        ;
};

export default NotFound;