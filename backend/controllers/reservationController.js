// backend/controllers/reservationController.js
const Application = require('../models/Application')

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Application.aggregate([
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$usageDateTime" } },
          hour: { $hour: "$usageDateTime" }
        }
      },
      {
        $project: {
          date: 1,
          slot: { $multiply: [{ $floor: { $divide: ["$hour", 2] } }, 2] }
        }
      },
      {
        $group: {
          _id: { date: "$date", slot: "$slot" },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.date",
          slots: { $push: { slot: "$_id.slot", count: "$count" } }
        }
      },
      { $sort: { _id: 1 } }
    ])
    res.json({ success: true, reservations })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
