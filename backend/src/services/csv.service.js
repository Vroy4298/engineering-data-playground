const { Readable } = require("stream");
const csv = require("csv-parser");

const databaseService = require("./database.service");
const { validateRow } = require("../utils/validator");

async function processCSV(fileBuffer, originalname) {

    return new Promise((resolve, reject) => {

        const rows = [];

        Readable.from(fileBuffer)

            .pipe(csv())

            .on("data", (row) => {

                rows.push(row);

            })

            .on("end", async () => {

                try {

                    let uploaded = 0;
                    let duplicates = 0;

                    const failed = [];

                    // Step 1: Extract all emails
                    const emails = rows.map(row => row.email);

                    // Step 2: Fetch existing emails in ONE query
                    const existingEmails = await databaseService.getExistingEmails(emails);

                    // Step 3: Convert to Set for O(1) lookup
                    const existingEmailSet = new Set(existingEmails);

                    // Step 4: Process each row
                    for (const row of rows) {

                        // Validate row
                        const validation = validateRow(row);

                        if (!validation.isValid) {

                            failed.push({
                                row,
                                reason: validation.errors
                            });

                            continue;
                        }

                        // Duplicate Detection
                        if (existingEmailSet.has(row.email)) {

                            duplicates++;

                            failed.push({
                                row,
                                reason: ["Duplicate email"]
                            });

                            continue;
                        }

                        try {

                            await databaseService.insertRecord(row);

                            uploaded++;

                            // Add newly inserted email to Set
                            existingEmailSet.add(row.email);

                        }

                        catch (error) {

                            failed.push({
                                row,
                                reason: [error.message]
                            });

                        }

                    }

                    await databaseService.saveUploadHistory({
                        filename: originalname,
                        total: rows.length,
                        uploaded,
                        duplicates,
                        failed: failed.length
                    });

                    resolve({

                        total: rows.length,

                        uploaded,

                        duplicates,

                        failed

                    });

                }

                catch (error) {

                    reject(error);

                }

            })

            .on("error", reject);

    });

}

module.exports = {
    processCSV
};