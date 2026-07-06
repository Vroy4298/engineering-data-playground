const pool = require("../config/db");

async function fetchAllRecords(queryParams) {

    let {

        page = 1,

        limit = 10,

        search = "",

        city,

        sort = "id",

        order = "desc"

    } = queryParams;

    page = Number(page);
    limit = Number(limit);

    const offset = (page - 1) * limit;

    const values = [];
    let index = 1;

    let query = `
        SELECT *
        FROM uploaded_data
    `;

    const conditions = [];

    if (search) {

        conditions.push(`

            (

                name ILIKE $${index}

                OR email ILIKE $${index}

            )

        `);

        values.push(`%${search}%`);

        index++;

    }

    if (city) {

        conditions.push(`city = $${index}`);

        values.push(city);

        index++;

    }

    if (conditions.length > 0) {

        query += ` WHERE ${conditions.join(" AND ")}`;

    }

    const allowedSort = ["id", "name", "age", "city", "created_at"];

    if (!allowedSort.includes(sort)) {

        sort = "id";

    }

    order = order.toUpperCase() === "ASC" ? "ASC" : "DESC";

    query += ` ORDER BY ${sort} ${order}`;

    query += ` LIMIT $${index}`;

    values.push(limit);

    index++;

    query += ` OFFSET $${index}`;

    values.push(offset);

    const result = await pool.query(query, values);

    return result.rows;

}

module.exports = {

    fetchAllRecords

};