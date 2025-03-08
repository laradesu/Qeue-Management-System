const Queue = require("../models/Queue");

app.post("/branches/:branchId/queue", async (req, res) => {
  const branchId = req.params.branchId;

  try {
    // Find the latest queue number for the branch
    const latestQueue = await Queue.findOne({ branchId })
      .sort("-queueNumber")
      .exec();

    // Generate the next queue number
    const nextQueueNumber = latestQueue ? latestQueue.queueNumber + 1 : 1;

    // Create a new queue document
    const queue = new Queue({ branchId, queueNumber: nextQueueNumber });
    await queue.save();

    // Return the generated queue information
    res.json({ queueNumber: nextQueueNumber, branchId });
  } catch (err) {
    console.error("Error generating queue", err);
    res.status(500).json({ error: "Failed to generate queue" });
  }
});
