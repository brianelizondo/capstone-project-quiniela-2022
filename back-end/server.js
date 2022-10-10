/** 
* Server for Quinielas 2022 App
*/
const app = require('./app');
const { PORT } = require('./config');

app.listen(PORT, function () {
    console.log(`Server starting on port ${PORT}`);
});