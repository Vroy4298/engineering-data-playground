const csvService = require("../services/csv.service");
const uploadHistoryService = require("../services/uploadHistory.service");

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

async function getUploadHistory(req, res) {

    try {

        const history = await uploadHistoryService.getUploadHistory();

        return res.status(200).json(history);

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

}

module.exports = {

    addSampleData,

    getUploadHistory

};