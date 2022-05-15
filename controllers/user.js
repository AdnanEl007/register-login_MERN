let User = require('../models/User');

exports.list_user = async (req, res) =>{
    try {
        User.find()
            .find((users) => res.json(users))
            .catch((err) => res.status(400).json('Error: ' + err));
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

