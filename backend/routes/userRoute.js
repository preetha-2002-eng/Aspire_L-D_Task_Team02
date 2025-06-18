// const express = require("express");
// const user = express();
// const multer = require("multer");
// const path = require("path");
// const router = express.Router();
// const bodyParser = require("body-parser");
// user.use(bodyParser.urlencoded({ extended: true }));
// user.use(express.static(path.resolve(__dirname, 'public')));
// // var storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, '../public/uploads');
// //     },
// //     filename: (req, file, cb) => {
// //         cb(null, file.originalname)
// //     }
// // });
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Make sure this folder exists
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
// var upload = multer({ storage: storage });
// const { importUser } = require("../controllers/userController");
// //user.post('/importUser', upload.single('file'), userController.importUser);
// router.post('/importUser', upload.single('file'), importUser);
// module.exports = user;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const { importUser } = require("../controllers/userController");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(path.resolve(__dirname, 'public')));
const uploadPath = path.join(__dirname, '../public/uploads');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });

router.post('/importUser', upload.single('file'), importUser);

module.exports = router; // ✅ export the actual router
