const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: string,
      default: "/defaults/image.jpg",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
    },
    private: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const projectModel = mongoose.model("project", projectSchema);
module.exports = { projectModel };
