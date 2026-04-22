import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt" // used for hashing passwords

const userSchema= new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName:{
        type: String,
        required: true,
        trim:true,
        index: true
    },
    password:{
        type: String,
        required: [true,"Password is required"]
    },
    avatar:{
        type: String, //cloudinary url
        required: true
    },
    coverImage:{
        type:String
    },
    watchHistory:[  // package k/a aggregate-paginate-v2 is used
        {
            type:Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    refreshToken:{
        type:String
    }

},
{timestamps:true})


//preHooks
userSchema.pre("save", async function (next){  // preHooks: i.e. save karne se just pehle execute krwa do , eg : password hashing
    
    if(!this.isModified("password")) return next() // agar modify nahi hua password , toh direct return krdo without encryption

    this.password= bcrypt.hash(this.password, 10) // bcrypt.hash("kisko encrypt krna hai", "kitne rounds lgane hai encryption ke" )
    next()  //till now there is a problem in this,
    //  it will update password everytime user saves his infor, 
    // eg: user changed his avatar, when he clicks on save , 
    // it encrypts password again, 
    // we have to write it such than only when password field is entered or updated ,
    //  then only encrypt, don't encrypt everytime
    //So the above if condition written helps to solve this problem
} ) 

// custom methods
userSchema.methods.isPasswordCorrect = async function(password){ // to check if the password entered is correct or not, i.e mathces with the encrypted password
  return await bcrypt.compare(password,this.password)  //password: jo humne enter kiya, this.password: jo encrypted tha, Await is written coz time lagta hai compare hone mein
}


// these both are JWT tokens
userSchema.methods.generateAccessToken= function(){ // no need for async await as it is fast
   return jwt.sign(  //this methods returns the access token once it is generated
        {
            _id:this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
} 
userSchema.methods.generateRefreshToken= function(){ // no need for async await as it is fast
    return jwt.sign(  //this methods returns the refresh token once it is generated
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
} 

export const User = mongoose.model("User", userSchema)