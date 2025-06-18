// var user = require('../models/User');
// var csv = require('csvtojson');
// const { response } = require('../routes/userRoute');
// const importUser = async (req, res) => {
//     try {
//         var userData = [];
//         csv()
//             .fromFile(req.file.path)
//             .then(async (response) => {
//                 for (var x = 0; x < response.length; x++) {
//                     userData.push({
//                         name: response[x].Name,
//                         email: response[x].Email,
//                         mobile: response[x].Mobile,
//                     })
//                 }
//                 await user.insertMany(userData);

//             })

//         res.send({
//             status: 200,
//             success: true,
//             message: 'File uploaded successfully'
//         });
//     }
//     catch (error) {
//         res.send({
//             status: 400,
//             success: false,
//             message: error.message
//         });
//     }
// }

// module.exports = {
//     importUser
// }
const User = require('../models/User');
const csv = require('csvtojson');

const importUser = async (req, res) => {
    try {
        const jsonArray = await csv().fromFile(req.file.path);

        console.log("Parsed CSV Data: ", jsonArray); // ✅ Check your field names here

        const userData = jsonArray.map(record => ({
            name: record.name || record.Name,
            empId: record.empId || record.EmpId,
            email: record.email || record.Email,
            mobile: record.mobile || record.Mobile
        }));

        await User.insertMany(userData);

        res.status(200).send({
            success: true,
            message: 'File data saved to database successfully'
        });

    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    importUser
};