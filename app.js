const express = require('express');
const routesUser = require('./src/routes/userRoutes');
const routesAuth = require('./src/routes/authRoute');
const cors = require('cors');

const app = express();

//use the routes from the 'routes.js file'
// app.use(bodyParser.json());
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use('/user', routesUser);
app.use('/auth', routesAuth);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});