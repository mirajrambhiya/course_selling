const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const User = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
})

const Admin = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
})

const Course = new Schema({
    creatorid: objectId,
    title: String,
    description: String,
    price: Number,
    imageURL: String
})

const Purchase = new Schema({
    courseid: objectId,
    userid: objectId
})

const UserModel = mongoose.model('users', User)
const AdminModel = mongoose.model('admins', Admin)
const CourseModel = mongoose.model('courses', Course)
const PurchaseModel = mongoose.model('purchases', Purchase)

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}