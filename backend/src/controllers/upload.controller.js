const uploadService = require("../services/upload.service");

async function addSampleData(req, res) {

    try {

        const result = await uploadService.insertSample();

        res.status(201).json(result);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

module.exports = {
    addSampleData
};