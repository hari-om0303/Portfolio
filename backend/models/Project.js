const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    keySkills: {
      type: [String],
      default: [],
    },
    link: {
      type: String,
      default: '',
    },
    githubLink: {
      type: String,
      default: '',
    },
    features: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: true,
      enum: ['Full Stack', 'Networking', 'AI & Python'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
