var user = require('../models/User');
var csv = require('csvtojson');
const { response } = require('../routes/userRoute');
const importUser = async (req, res) => {
    try {
        var userData = [];
        csv()
            .fromFile(req.file.path)
            .then(async (response) => {
                for (var x = 0; x < response.length; x++) {
                    userData.push({
                        name: response[x].Name,
                        email: response[x].Email,
                        mobile: response[x].Mobile,
                    })
                }
                await user.insertMany(userData);

            })

        res.send({
            status: 200,
            success: true,
            message: 'File uploaded successfully'
        });
    }
    catch (error) {
        res.send({
            status: 400,
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    importUser
}