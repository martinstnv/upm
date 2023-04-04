const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const getItems = (request, response) => {
    pool.query('SELECT * FROM items;',
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        });
}

const getTypes = (request, response) => {
    pool.query('SELECT * FROM types;',
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        });
}

const getUser = async (username) => {
    try {
        const res = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
        return res.rows;
    }
    catch (err) {
        return err.stack;
    }
}

const createItem = async (req, res) => {

    const { name, type, content } = req.body;
    
    console.log(name);
    console.log(type);
    console.log(content);

    try {
        pool.query(`INSERT INTO items (name, type, content) VALUES ($1, $2, $3);`, [name, type, content],(q_err, q_res) => {
            if (q_err) return next(q_err);
            res.json(q_res.rows);
           });
    }
    catch (err) {
        return err.stack;
    }
}

module.exports = {
    getItems,
    getTypes,
    getUser,
    createItem
}