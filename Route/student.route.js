const express = require("express")
const router = express.Router()
const {validate} = require("../middleware/validator")
const {uservalidation} = require("../middleware/uservalidation")
const {studentsignup, getlandingpage, getstudentsignup} = require("../controller/student.controller")


router.get('/', getlandingpage)
router.get("/signup", getstudentsignup)
router.post('/register', validate(uservalidation), studentsignup)



module.exports = router