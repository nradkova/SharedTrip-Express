const {Schema,model}=require('mongoose');

const schema=new Schema({
    start:{
        type:String,
        required:true
    },
    end:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    carImage :{
        type:String,
        required:true
    },
    carBrand :{
        type:String,
        required:true
    },
    seats:{
        type:Number,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    description :{
        type:String,
        required:true
    },
    owner :{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    buddies :[{
        type:Schema.Types.ObjectId,
        ref:'User',
        default:[]
    }]
},{timestamps:true});

module.exports=model('Trip',schema);