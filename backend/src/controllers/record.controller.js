const recordService = require("../services/record.service");

async function getAllRecords(req, res) {

    try {

        const records = await recordService.fetchAllRecords(req.query);

        return res.status(200).json(records);

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

}

module.exports = {

    getAllRecords

};