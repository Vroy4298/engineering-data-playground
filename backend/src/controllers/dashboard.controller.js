const dashboardService = require("../services/dashboard.service");

async function getStats(req, res) {

    try {

        const stats = await dashboardService.getDashboardStats();

        return res.status(200).json(stats);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

module.exports = {
    getStats
};