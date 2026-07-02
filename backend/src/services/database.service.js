const pool = require("../config/db");

async function insertRecord(data) {

    const { name, email, age, city } = data;

    const query = `
        INSERT INTO uploaded_data
        (name, email, age, city)
        VALUES ($1, $2, $3, $4)
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

async function getExistingEmails(emails) {

    if (emails.length === 0) {
        return [];
    }

    const query = `
        SELECT email
        FROM uploaded_data
        WHERE email = ANY($1);
    `;

    const result = await pool.query(query, [emails]);

    return result.rows.map(row => row.email);

}


// NEW FUNCTION
async function saveUploadHistory(data) {

    const query = `
        INSERT INTO upload_history
        (
            filename,
            total_rows,
            uploaded_rows,
            duplicate_rows,
            failed_rows
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const values = [
        data.filename,
        data.total,
        data.uploaded,
        data.duplicates,
        data.failed
    ];

    const result = await pool.query(query, values);

    return result.rows[0];

}

module.exports = {
    insertRecord,
    getExistingEmails,
    saveUploadHistory
};