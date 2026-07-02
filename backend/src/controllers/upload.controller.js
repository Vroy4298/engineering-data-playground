const csvService = require("../services/csv.service");

async function addSampleData(req, res) {

    try {

        if (!req.file) {

            return res.status(400).json({

                message: "CSV file is required."

            });

        }

        const result = await csvService.processCSV(req.file.path);

        return res.status(201).json({

            message: "CSV uploaded successfully.",

            summary: result

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

}

module.exports = {

    addSampleData

};