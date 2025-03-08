const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
  {
    serviceType: {
      type: String,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      required: true,
      default: "pending",
    },
    TransactionId: {
      type: String,
      default: null,
    },
    TellerId: {
      type: String,
    },
    UniqueId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", queueSchema);
