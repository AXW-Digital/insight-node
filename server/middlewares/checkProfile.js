const mongoose = require('mongoose');
const Profile = mongoose.model('profile');


module.exports = async (req, res, next) => {

    const filter = {_user: req.user.id}
    const profile = await Profile.findOne(filter);
    
    if(!profile){
        res.status(404).send({error: 'profile'})
    }
    next();

}