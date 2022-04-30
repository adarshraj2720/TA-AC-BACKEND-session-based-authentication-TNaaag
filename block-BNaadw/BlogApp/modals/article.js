var mongoose = require('mongoose');
const { schema } = require('./user');
var Schema = mongoose.Schema;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

var articleSchema = new Schema({
    title:{type:String},
    description:{type:String},
    likes:{type:Number,default:0},
    commentsId:[{type:Schema.Types.ObjectId,ref:"Comment"}],
    author:{type:String},
    slug:{type:String,slug:"title"},

},
{
    timestamps:true
})

var Articel = mongoose.model('Articel',articleSchema);
module.exports=Articel