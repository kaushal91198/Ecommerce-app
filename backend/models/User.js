const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false,

    },

},{timestamps:true})

//this method is stored in database collection
userSchema.methods.matchPassword = async function (enterPassword){
    return await bcrypt.compare(enterPassword,this.password) // it password comparison is true then it will return true
}
//this method is stored is model object
// userSchema.statics.matchPassword = async function (enterPassword,password){
//     return await bcrypt.compare(enterPassword,password) // it password comparison is true then it will return true
// }

userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
}) 

const User = mongoose.model('user',userSchema)
module.exports = User