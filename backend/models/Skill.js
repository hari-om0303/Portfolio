const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Programming Languages',
        'Frontend Technologies',
        'Backend Technologies',
        'Databases',
        'Networking',
        'Cloud',
        'Developer Tools',
        'CS Fundamentals',
        'AI/ML & Data Science',
      ],
    },
    level: {
      type: String,
      required: true,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 3,
    },
    yearsOfExperience: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
