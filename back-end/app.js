/** 
* Express app for Quinielas 2022 App
*/
const express = require("express");
const cors = require("cors");

/** Function to handle express errors */
const { NotFoundError } = require("./expressError");

/** Routes */
const usersRoutes = require("./routes/users");

const app = express();
app.use(cors());
app.use(express.json());

/** Routes directories */
app.use("/users", usersRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next){
    return next(new NotFoundError());
});
  
/** Generic error handler */
app.use(function (err, req, res, next){
    // the default status is 500 Internal Server Error
    const status = err.status || 500;
    const message = err.message;
    // set the status and alert the user
    return res.status(status).json({
        error: { message, status },
    });
});

// Export app to start server from server.js
module.exports = app;