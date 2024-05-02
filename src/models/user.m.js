'use strict'

const mongoose = require('mongoose'); 
const {Schema, Types} = require('mongoose')
const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'

const userSchema = new Schema(
    {
      fullname: String,
      avatar: String,
      state: { type: String, enum: ["active", "ban"], default: "active" },
      email: {
        type: String,
        unique: true,
        sparse: true,
      },
      password: { type: String, required: true },
      birth_date: { type: Date },
      gender: {
        type: String,
        enum: ["male", "female"],
      },
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
      bio: String,
      history: [{ type: Types.ObjectId, ref: "Plan" }],
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME}
  );

module.exports = mongoose.model(DOCUMENT_NAME, userSchema);