const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const orderSchema = new Schema({
   
   cart:Array,
   total:Number,
   option:Number
},{timestamps:true}
);

Orderconference = mongoose.model('Orderconference',orderSchema);
module.exports = Orderconference;
