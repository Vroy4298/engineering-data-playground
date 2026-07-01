const pool = require("../config/db");

async function insertSample() {

    const query = `
        INSERT INTO uploaded_data(name, email, age, city)
        VALUES($1, $2, $3, $4)
        RETURNING *;
    `;

    const values = [
        "Vivek Kumar",
        "vivek@example.com",
        20,
        "Phagwara"
    ];

    const result = await pool.query(query, values);

    return {
        message: "Sample data inserted successfully",
        data: result.rows[0]
    };
}

module.exports = {
    insertSample
};