import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobProfile",
  },
  interview_type: {
      type: String,
  },
  company_name: {
    type: String,
    required: true,
  },
  company_logo: {
    type:String,
  },
  interview_date: {
      type: Date,
  },
  interview_link: {
    type: String,
  },
  interview_time: {
    type: String,
  },
  interview_info: {
    type: String,
  },
  eligible_students: [
    {
      name: {
        type: String,
        required: true,
      },
      email:{
          type:String
      },
    }
  ],
  shortlisted_students: [
    {
      name: {
        type: String,
        required: true,
      },
      email:{
          type:String
      },
    }
  ]
}, { timestamps: true });

const Interview = mongoose.model('Interview', InterviewSchema);

export default Interview;
