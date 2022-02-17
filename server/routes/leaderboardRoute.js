const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
var _ = require('underscore');

const Survey = mongoose.model('survey');
const Profile = mongoose.model('profile')

module.exports = app => {

    app.get('/api/data/activity', async (req, res) => {

        var profiles = await Profile.find().lean()

        var surveys = await Survey.aggregate([
            {
                $group: {
                    _id: '$_user',
                    count: { $sum: 1 }
                }
            }
        ]);

        var questions = await Survey.aggregate([

            {
                $addFields:
                {
                    answers:
                        { $first: "$formData" }
                }
            },
            {
                $project: {
                    _user: 1,
                    _id: 0,
                    answers: 1
                }
            },
            {
                $addFields:
                {
                    answersArr: { $objectToArray: '$answers' }
                }
            },
            {
                $addFields:
                {
                    count:
                        { $size: "$answersArr" }
                }
            },
            {
                $project: {
                    _user: 1,
                    _id: 0,
                    count: 1
                }
            },
            {
                $group: {
                    _id: '$_user',
                    totalQuestions: {$sum: "$count"}
                }
            }


        ]);

        const profile = profiles.map(x => ({ id: x._user.toString(), uName: x.uName, points: x.points, avatar: x.avatarSeed }))
        const survey = surveys.map(x => ({ id: x._id.toString(), surveyCount: x.count }))
        const question = questions.map(x => ({ id: x._id.toString(), totalQuestions: x.totalQuestions }))

        var mergedList = _.map(profile, function (item) {
            return _.extend(item, _.findWhere(survey, { id: item.id }));
        });

        var mergedList2 = _.map(mergedList, function (item) {
            return _.extend(item, _.findWhere(question, { id: item.id }));
        });



        return res.status(200).send(mergedList2)


    })


}