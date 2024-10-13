import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';


// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email : email});

    if(user && (await user.matchPassword(password))){
        
        const token = jwt.sign({ userId : user._id}, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        // Set JWT as HTTP-Only Cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite : 'strict',
            maxAge:  24 * 60 * 60* 1000
        });
        


        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });

    }else{
        res.status(401);
        throw new Error("Invalid email or password");
    }

});


// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({email : email});

    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({name : name, email: email, password: password});

    if(user){

        const token = jwt.sign({ userId : user._id}, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        // Set JWT as HTTP-Only Cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite : 'strict',
            maxAge:  24 * 60 * 60* 1000
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin : user.isAdmin
        });
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message: 'Logged out successfully'});
});


// @desc Get user profile
// @route GET /api/users/profile
// @access Public
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user_id);
    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(404);
        throw new Error("User not found!");
    }
}) ;

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user_id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        
        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updateUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    }else{
        res.status(404);
        throw new Error("User not found!");
    }
}) ;


// @desc Get users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send("Get Users");
}) ;

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.send("Get User by ID");
}) ;

// @desc Delete user
// @route DELETE /api/users/id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send("Delete user");
}) ;

// @desc Update user
// @route PUT /api/users/id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send("Update user");
}) ;


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    updateUser,
    getUserById
} 












