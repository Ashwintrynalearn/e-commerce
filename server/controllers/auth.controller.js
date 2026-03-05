import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
 
import User from '../models/user.model.js';
import { JWT_SECRET } from '../config/env.js';
 
export const register = async (req, res,next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error('Email already in use');
            error.statusCode = 400;
            throw error;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = await User.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ userId : newUser._id }, JWT_SECRET, { expiresIn: '1h' });
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                token, 
                user: newUser,
            }   
        });
    }catch (error) {
        next(error);
    }
}

export const signIn = async ( req,res,next)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email}).select('+password');
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        console.log(user.password);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if(!isPasswordValid){
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({ userId : user._id},JWT_SECRET,{ expiresIn: '1h' });
        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                token,
                user,
            }
        });
    }catch (error) {
        next(error);        
    }
}