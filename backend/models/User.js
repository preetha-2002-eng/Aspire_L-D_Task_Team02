var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    empId: {
        type: String,
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
    }
    ,
});
module.exports = mongoose.model('User', userSchema);