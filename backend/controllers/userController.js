const User = require('../models/User');
const csv = require('csvtojson');

const importUser = async (req, res) => {
    try {
        const jsonArray = await csv().fromFile(req.file.path);

        console.log("Parsed CSV Data: ", jsonArray); 
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