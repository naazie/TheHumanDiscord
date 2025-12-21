// auth.model.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// dotenv.config();

const authSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false
        }
    },
    {timestamps: true}
)

authSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

authSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

export default mongoose.model("User", authSchema);