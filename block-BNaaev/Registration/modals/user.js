var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userSchema  = new Schema({
    name :{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,minlength:5,required:true},
    age:Number,
    phone:Number
},
    {timestamps:true}
)

userSchema.pre('save',function(next){
    console.log(this,'This in the pre')
    if(this.password && this.isModified ('password')){
        bcrypt.hash(this.password,10,(err,hashed)=>{
            if(err) return next(err)
            this.password = hashed;
            return next()
        })
    }else{
        next()
    }
})






var User = mongoose.model('User',userSchema);
module.exports=User;