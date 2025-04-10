import mongoose from "mongoose";

const InternshipSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
    },
    company_logo: {
      type: String,
    },
    internship_offer_mode:{
      type:String,
      enum:['Off-Campus','On-Campus'],
      default:'On-Campus',
    },
    internship_type: {
      type: String,
      enum: ['Tech', 'Non-Tech','Tech+Non-Tech'],
    },
    internship_duration: {
       type:String,
       enum:['2m Intern','6m Intern','11m Intern']
    },
    batch:{
        type:String,
        enum:['2022','2023','2024','2025','2026','2027','2028','2029','2030']
    },
    degree: {
      type:String,
      enum:["B.Tech","M.Tech","MBA","M.Sc","PHD"],
    },
    stipend:{
      type:String,
    },
    role:{
      type:String,
    },
    result_date: {
      type: Date,
    },
    shortlisted_students: [
      {
        studentId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'Student'
        },
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
        },
        email:{
            type:String
        },
        gender:{
          type:String,
          enum:['Male','Female','Other']
        },
        department: {
          type: String,
          enum: [ "Biotechnology","Chemical Engineering","Civil Engineering","Computer Science & Engineering","Data Science and Engineering","Electrical Engineering",
            "Electronics & Communication Engineering","Electronics and VLSI Engineering","Industrial and Production Engineering",
            "Information Technology","Instrumentation and Control Engineering","Mathematics and Computing","Mechanical Engineering",
            "Textile Technology","Structural and Construction Engineering","Geotechnical and Geo-Environmental Engineering",
            "Information Security","Electric Vehicle Design","Signal Processing and Machine Learning","VLSI Design","Industrial Engineering and Data Analytics",
            "Manufacturing Technology With Machine Learning","Data Analytics","Control and Instrumentation","Machine Intelligence and Automation",
            "Mathematics and Computing","Design Engineering","Thermal and Energy Engineering","Textile Engineering and Management","Renewable Energy",
            "Artificial Intelligence","Power Systems and Reliability","Finance","Human Resource","Marketing","Chemistry","Mathematics",
            "Physics"],
        },
        category:{
          type:String,
        },
      }
    ],
    visibility: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Internship = mongoose.model("Internship", InternshipSchema);
export default Internship;