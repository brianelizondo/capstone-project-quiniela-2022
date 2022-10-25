/** 
* Express app for Quinielas 2022 App
*/
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

/** Function to handle express errors */
const { NotFoundError } = require("./expressError");

/** Routes */
const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const quinielasRoutes = require("./routes/quinielas");
const matchesRoutes = require("./routes/matches");
const teamsRoutes = require("./routes/teams");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

/** Routes directories */
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/quinielas", quinielasRoutes);
app.use("/matches", matchesRoutes);
app.use("/teams", teamsRoutes);

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