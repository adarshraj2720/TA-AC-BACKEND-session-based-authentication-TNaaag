var mongoose = require('mongoose');
const { schema } = require('./user');
var Schema = mongoose.Schema;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

var commentSchema = new Schema({
    title:{type:String},
    author:{type:String},
    likes:{type:Number,default:0},
    articlesId:[{type:Schema.Types.ObjectId,ref:"Articel"}],
    slug:{type:String,slug:"title"},
    articelSlug:{type:String}
    
},
{
    timestamps:true
})

var Comment = mongoose.model('Comment',commentSchema);
module.exports=Comment