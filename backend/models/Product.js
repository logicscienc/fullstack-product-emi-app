const mongoose = require("mongoose");

// EMI schema, plans multiple options to pay monthly
const EmiSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
     tenureMonths: {
        type: Number,
        required: true,
     },
     monthly: {
        type: Number,
        required: true,
     },
     interestRate: {
        type: Number,
        default: 0,
     },
     cashback: {
        type: String,
        default: "",
     }

});

// variant schema Storage/color variations (256GB Silver / 512GB Black)

const VariantSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    mrp: {
        type: Number,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },

});


// Top Level Product Data Schema

const ProductSchema = new mongoose.Schema({
    name: {
         type:String,
        required: true,
    },
    slug: {
        type:String,
        required: true,
        unique: true, 
    },
    description: {
         type:String,
    },
    variants: {
       type: [VariantSchema],
       required: true , 
    },
    emiPlans: {
        type: [EmiSchema],
        required: true ,
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);