const pool = require("../config/db");

async function getDashboardStats() {

    const totalRecords = await pool.query(`
        SELECT COUNT(*) FROM uploaded_data;
    `);

    const averageAge = await pool.query(`
        SELECT ROUND(AVG(age),2) AS average_age
        FROM uploaded_data;
    `);

    const totalUploads = await pool.query(`
        SELECT COUNT(*) FROM upload_history;
    `);

    const cityStats = await pool.query(`
        SELECT city, COUNT(*) AS total
        FROM uploaded_data
        GROUP BY city
        ORDER BY total DESC;
    `);

    return {

        totalRecords: Number(totalRecords.rows[0].count),

        averageAge: Number(averageAge.rows[0].average_age),

        totalUploads: Number(totalUploads.rows[0].count),

        cities: cityStats.rows

    };

}

module.exports = {
    getDashboardStats
};