const studentmodel = require('../model/student.model')
const bcrypt = require('bcryptjs')
const { cloudinary } = require('../utils/cloudinary')
const { uservalidation } = require("../middleware/uservalidation")
const mail = require('../middleware/mailer')


const studentsignup = async (req, res) => {
    try {
        console.log(req.body, "body");
        const { username, email, password } = req.body
        if (username == "" || password == "" || email == "") {
            res.status(402).send({ message: "input fields cannot be empty", status: false })
        }
        const validate = await uservalidation.validate(req.body)
        if (!validate) {
            res.status(401).send({ message: "unable to validate user", status: false })
        }
        const existinguser = await studentmodel.findOne({ email: email })
        console.log(existinguser);
        if (existinguser) {
            res.status(405).send({ message: "user already exist", status: false })
        }
        const student = await studentmodel.create({ username, email, password })
        if (!student) {
            res.status(400).send({ message: 'unable to save user', status: false })
        }
        await mail(email, username)
        return res.status(200).send({ message: 'user signed up', status: true })
    } catch (error) {
        console.log(error);
        if (error) {
            res.status(407).send({ message: error.message })
        }
        return res.status(500).send({ message: 'internal server error', staus: false })
    }
}
const getstudentsignup = (req, res) => {
    
    res.render("signup")
}
const getlandingpage = (req, res) => {
    res.render("index")
}


module.exports = { studentsignup, getlandingpage, getstudentsignup }