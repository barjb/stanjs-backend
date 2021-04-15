const mongoose = require('mongoose');

const stateSchema = mongoose.Schema({
    survey: String,
    year: Number,
    user_info: {
        device: String,
        job_title: String,
        yearly_salary: String,
        years_of_experience: String,
        gender: String,
        country_name: String,
    },
    browser: String,
    os: String,
    tools: {
        typescript: Object,
        angular: Object,
        react: Object,
        vuejs: Object,
        express: Object,
        jest: Object,
        mocha: Object,
    },
});

const State = mongoose.model('State', stateSchema);
module.exports = State;
