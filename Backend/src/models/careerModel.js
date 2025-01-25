const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,    
    },
    experience: {
      type: Number,  
      required: true,
      min: 0,         
    },
    jobtype: {
      type: String,
      enum: ["full time", "part time", "freelance", "contract"], // Restricts to valid job types
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,  
    },
    requirements: {
      type: String,   
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('Career', careerSchema);
