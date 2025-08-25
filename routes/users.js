const express = require("express")
const { UserModel } = require("../db");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middlewares/user");

const JWT_SECRET = process.env.JWT_USER_SECRET;

userRouter.post("/signup", async function (req, res){
    try{
        const UserSchema = z.object({
            firstname: z.string(),
            lastname: z.string(),
            email: z.email("Please enter a valid email"),
            password: z.string().min(3).max(15)
        })

        const isValidUser = UserSchema.safeParse(req.body);
        if(isValidUser.success){
            const firstName = req.body.firstname;
            const lastName = req.body.lastname;
            const email = req.body.email;
            const password = req.body.password;

            const hashedPassword = await bcrypt.hash(password, 9);

            await UserModel.create({
                firstName,
                lastName,
                email,
                password: hashedPassword
            })
            res.json({
                message: "Signed up successfully"
            })
        }
        else{
            res.json({
                message: isValidUser.error.issues[0].message
            })
        }
    }
    catch(e){
        res.json({
            message: "Email already exists"
        })
    }
})

userRouter.post("/signin", async function (req, res){
    const UserSchema = z.object({
        email: z.email("Please enter a valid email"),
        password: z.string().min(3).max(15)
    })

    const isValidUser = UserSchema.safeParse(req.body);
    if(isValidUser.success){
        const email = req.body.email;
        const password = req.body.password;

        const foundUser = await UserModel.findOne({
            email
        })
        if(foundUser){
            const isMatching = await bcrypt.compare(password, foundUser.password);
            if(isMatching){
                const token = jwt.sign({
                    id: foundUser._id
                }, JWT_SECRET);
                res.json({
                    token
                })
            }
            else{
                res.json({
                message: "Incorrect email or password"})
            }
        }
        else{
            res.json({
                message: "Incorrect email or password"})  
        }
    }
    else{
        res.json({
            message: isValidUser.error.issues[0].message
        })
    }
})

userRouter.get("/purchases", userMiddleware, function (req, res){
    
})

module.exports = userRouter;