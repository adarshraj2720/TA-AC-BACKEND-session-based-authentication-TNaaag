var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName:{type:String},
    lastName:{type:String},
    email:{type:String},
    password:{type:String,unique:true},
    city:{type:String},
})


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


userSchema.methods.verifypassword=function(password,cb){
    bcrypt.compare(password,this.password ,(err,result)=>{
        console.log(result)
        return cb(err,result)
    })
}


var User = mongoose.model('User',userSchema);
module.exports= User;