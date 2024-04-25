'use strict'

const mongoose = require('mongoose'); 
const DOCUMENT_NAME = 'Shop'
const COLLECTION_NAME = 'Shops'

var shopSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        maxLength: 150
    },
    email:{
        type:String,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = mongoose.model(DOCUMENT_NAME, shopSchema);