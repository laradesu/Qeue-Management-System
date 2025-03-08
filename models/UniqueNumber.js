const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
  {
    UniqueId: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UniqueId", queueSchema);
