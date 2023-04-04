require("dotenv").config();
const auth = require("./middleware/auth");
const express = require('express');
const db = require('./dao/dao');
const cors = require('cors');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('./config');
const app = express();
const port = 4545;

app.use(cors({
    origin: config[process.env.APP_ENV].origin,
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

app.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!(username && password)) res.status(400).json({ error: "Error. All fields are required!" });

        db.getUser(username.toLowerCase()).then(result => {

            const [user] = result;

            if (user) {

                bcrypt.compare(password.toLowerCase(), user.password).then(valid => {

                    if (valid) {

                        const token = jwt.sign({ username: user.username }, process.env.TOKEN_KEY, { expiresIn: "365d" });

                        res.cookie('token', token, {
                                expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                                secure: false,
                            })
                            .status(200).json({
                                success: 'Success.'
                            });
                    }
                    else {
                        res.status(400).json({
                            error: 'Invalid username or password.'
                        });
                    }
                })
            }
        });
    }
    catch (err) {
        console.log('[/login] error: ', err);
        res.status(500).json({
            error: 'Server error.'
        });
    }
});

app.get('/items', auth, db.getItems);

app.get('/types', auth, db.getTypes);

app.post('/create', auth, db.createItem);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});