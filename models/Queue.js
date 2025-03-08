const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      default: null,
    },
    ticketNumber: {
      type: Number,
      required: true,
    },
    WindowNumber: {
      type: Number,
      default: null,
    },
    serviceType: {
      type: String,
      default: null,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    BranchName: {
      type: String,
      default: null,
    },
    Status: {
      type: String,
      required: true,
      default: "pending",
    },
    UniqueId: {
      type: String,
      required: true,
    },
    TGComplete: {
      type: String,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Queue", queueSchema);
