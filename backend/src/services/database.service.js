const pool = require("../config/db");

async function insertRecord(data) {

    const { name, email, age, city } = data;

    const query = `
        INSERT INTO uploaded_data
        (name, email, age, city)
        VALUES ($1,$2,$3,$4)
        RETURNING *;
    `;

    const values = [
        name,
        email,
        Number(age),
        city
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
}

module.exports = {
    insertRecord
};