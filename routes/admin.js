const { Router } = require("express");
const { AdminModel } = require("../db")
const adminRouter = Router();
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_ADMIN_SECRET;

adminRouter.post("/signup", async function (req, res) {
    try{
        const AdminSchema = z.object({
            firstname: z.string(),
            lastname: z.string(),
            email: z.email("Please enter a valid email"),
            password: z.string().min(3).max(15)
        })

        const isValidAdmin = AdminSchema.safeParse(req.body);
        if(isValidAdmin.success){
            const firstName = req.body.firstname;
            const lastName = req.body.lastname;
            const email = req.body.email;
            const password = req.body.password;

            const hashedPassword = await bcrypt.hash(password, 9);

            await AdminModel.create({
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
                message: isValidAdmin.error.issues[0].message
            })
        }
    }
    catch(e){
        res.json({
            message: "Email already exists"
        })
    }
})

adminRouter.post("/signin", async function (req, res) {
    const AdminSchema = z.object({
        email: z.email("Please enter a valid email"),
        password: z.string().min(3).max(15)
    })

    const isValidAdmin = AdminSchema.safeParse(req.body);
    if(isValidAdmin.success){
        const email = req.body.email;
        const password = req.body.password;

        const foundAdmin = await AdminModel.findOne({
            email
        })
        if(foundAdmin){
            const isMatching = await bcrypt.compare(password, foundAdmin.password);
            if(isMatching){
                const token = jwt.sign({
                    id: foundAdmin._id
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
            message: isValidAdmin.error.issues[0].message
        })
    }
})

adminRouter.post("/course", function (req, res) {

})

adminRouter.put("/course", function (req, res) {

})

adminRouter.get("/course/bulk", function (req, res) {

})

module.exports = adminRouter;