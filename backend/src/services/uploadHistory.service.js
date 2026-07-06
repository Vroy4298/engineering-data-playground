const databaseService = require("./database.service");

async function getUploadHistory() {

    return await databaseService.getUploadHistory();

}

module.exports = {

    getUploadHistory

};