const fs = require("fs");
const csv = require("csv-parser");

const databaseService = require("./database.service");

async function processCSV(filePath) {

    return new Promise((resolve, reject) => {

        const rows = [];

        fs.createReadStream(filePath)

            .pipe(csv())

            .on("data", (row) => {

                rows.push(row);

            })

            .on("end", async () => {

                let uploaded = 0;

                const failed = [];

                for (const row of rows) {

                    try {

                        await databaseService.insertRecord(row);

                        uploaded++;

                    }

                    catch (error) {

                        failed.push({
                            row,
                            reason: error.message
                        });

                    }

                }

                resolve({

                    total: rows.length,

                    uploaded,

                    failed

                });

            })

            .on("error", reject);

    });

}

module.exports = {

    processCSV

};