import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, "Name is required"]
    },
    email:{
        type: String,
        require: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        require: [true, "Password is required"]
    },
    cartItems: [
        {
            quantity: {
                type: Number,
                default: 1,
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        },
    ],
    role:{
        type: String,
        enum: ["customer", "admin", "seller"],
        default: "customer"
    }
}, {
    //createdAT and updatedAT
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;