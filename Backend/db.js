const mongoose=require('mongoose');

const mongoURI = "mongodb://localhost:27017/sendnotes?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo = async() =>{
    mongoose.connect(mongoURI,console.log("connnect to mongo fully"))
}
module.exports= connectToMongo;