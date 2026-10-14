/**
 * HealthGuard AI - Prediction Data Model (Mongoose)
 * ------------------------------------------------
 * Stores screening assessments including input features, model scores,
 * Explainable AI attributions, and timestamps for historical review.
 */

const mongoose = require('mongoose');

const ExplanationItemSchema = new mongoose.Schema({
  feature: { type: String, required: true },
  label: { type: String, required: true },
  value: { type: Number, required: true },
  unit: { type: String, default: '' },
  dataset_median: { type: Number },
  importance_weight: { type: Number },
  impact_score: { type: Number },
  direction: { type: String },
  observation: { type: String }
}, { _id: false });

const PredictionSchema = new mongoose.Schema({
  inputs: {
    age: { type: Number, required: true },
    sex: { type: Number, required: true },
    cp: { type: Number, required: true },
    trestbps: { type: Number, required: true },
    chol: { type: Number, required: true },
    fbs: { type: Number, required: true },
    restecg: { type: Number, required: true },
    thalach: { type: Number, required: true },
    exang: { type: Number, required: true },
    oldpeak: { type: Number, required: true },
    slope: { type: Number, required: true },
    ca: { type: Number, required: true },
    thal: { type: Number, required: true }
  },
  modelScore: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  scorePercentage: {
    type: Number,
    required: true
  },
  binaryPrediction: {
    type: Number,
    enum: [0, 1],
    required: true
  },
  displayCategory: {
    type: String,
    required: true
  },
  tierCode: {
    type: String,
    enum: ['LOW', 'MODERATE', 'ELEVATED'],
    default: 'LOW'
  },
  thresholdMethodology: {
    type: String
  },
  explanation: [ExplanationItemSchema],
  disclaimer: {
    type: String,
    default: "HealthGuard AI is an educational screening prototype and must not be used as a medical diagnostic tool."
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Prediction', PredictionSchema);
