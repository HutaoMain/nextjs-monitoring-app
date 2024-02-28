import mongoose, { Schema } from "mongoose";

const JobSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    jobName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    askingSalary: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Jobs = mongoose.models.jobs || mongoose.model("jobs", JobSchema);

export default Jobs;
