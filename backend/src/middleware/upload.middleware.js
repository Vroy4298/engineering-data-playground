const multer = require("multer");

// Use memoryStorage — no disk access needed (works on Render & all cloud platforms)
const upload = multer({ storage: multer.memoryStorage() });

module.exports = upload;