const State = require('../models/state');

exports.getStats = (req, res) => {
    const docsCount = State.countDocuments().exec();
    const osGroup = State.aggregate([
        {
            $group: {
                _id: '$os',
                count: {
                    $sum: 1,
                },
            },
        },
        {
            $sort: { count: -1 },
        },
    ]).exec();
    const browserGroup = State.aggregate([
        {
            $group: {
                _id: '$browser',
                count: {
                    $sum: 1,
                },
            },
        },
        {
            $sort: { count: -1 },
        },
    ]).exec();
    const deviceGroup = State.aggregate([
        {
            $group: {
                _id: '$user_info.device',
                count: {
                    $sum: 1,
                },
            },
        },
        {
            $sort: { count: -1 },
        },
    ]);

    const jobTitleGroup = State.aggregate([
        {
            $group: {
                _id: '$user_info.job_title',
                count: {
                    $sum: 1,
                },
            },
        },
        {
            $sort: { count: -1 },
        },
    ]);
    const yearsOfExperience = State.aggregate([
        {
            $group: {
                _id: '$user_info.years_of_experience',
                count: { $sum: 1 },
            },
        },
        {
            $sort: { count: -1 },
        },
    ]);
    const yearlySalary = State.aggregate([
        {
            $group: {
                _id: '$user_info.yearly_salary',
                count: { $sum: 1 },
            },
        },
        { $sort: { count: -1 } },
    ]);
    const backendProficiency = State.aggregate([
        {
            $group: {
                _id: '$user_info.backend_proficiency',
                count: { $sum: 1 },
            },
        },
        {
            $sort: { count: -1 },
        },
    ]);
    const frontendProficiency = State.aggregate([
        {
            $group: {
                _id: '$user_info.css_proficiency',
                count: { $sum: 1 },
            },
        },
        {
            $sort: { count: -1 },
        },
    ]);

    Promise.all([
        osGroup,
        browserGroup,
        docsCount,
        deviceGroup,
        jobTitleGroup,
        yearsOfExperience,
        backendProficiency,
        frontendProficiency,
        yearlySalary,
    ])
        .then(
            ([
                osResult,
                browserResult,
                docsResult,
                deviceResult,
                jobTitleResult,
                yearsOfExperienceResult,
                backendResult,
                frontendResult,
                salaryResult,
            ]) => {
                res.json({
                    status: 'success',
                    message: 'GET stats',
                    data: {
                        os: osResult,
                        browser: browserResult,
                        documents: docsResult,
                        device: deviceResult,
                        jobTitle: jobTitleResult,
                        experience: yearsOfExperienceResult,
                        backend: backendResult,
                        frontend: frontendResult,
                        salary: salaryResult,
                    },
                });
            },
        )
        .catch((err) => {
            res.json({ status: 'error', message: err });
        });
};
exports.getFormOptions = (req, res) => {
    const os = State.distinct('os');
    const browser = State.distinct('browser');
    const device = State.distinct('user_info.device');
    const jobTitle = State.distinct('user_info.job_title');
    const experience = State.distinct('user_info.years_of_experience');
    const backend = State.distinct('user_info.backend_proficiency');
    const frontend = State.distinct('user_info.css_proficiency');
    const salary = State.distinct('user_info.yearly_salary');
    Promise.all([
        os,
        browser,
        device,
        jobTitle,
        experience,
        backend,
        frontend,
        salary,
    ])
        .then(
            ([
                osResult,
                browserResult,
                deviceResult,
                jobTitleResult,
                experienceResult,
                backendResult,
                frontendResult,
                salaryResult,
            ]) => {
                res.json({
                    status: 'success',
                    message: 'GET options',
                    data: {
                        os: osResult,
                        browser: browserResult,
                        device: deviceResult,
                        jobTitle: jobTitleResult,
                        experience: experienceResult,
                        backend: backendResult,
                        frontend: frontendResult,
                        salary: salaryResult,
                    },
                });
            },
        )
        .catch((err) => {
            res.json({ status: 'error', message: err });
        });
};
exports.postState = (req, res) => {
    const state = new State();
    console.log(req.body);
    state.user_info.device = req.body.user_info.device;
    state.user_info.job_title = req.body.user_info.job_title;
    state.user_info.yearly_salary = req.body.user_info.yearly_salary;
    // eslint-disable-next-line operator-linebreak
    state.user_info.years_of_experience =
        req.body.user_info.years_of_experience;
    state.browser = req.body.browser;
    state.os = req.body.os;
    state.save((err) => {
        if (err) res.json({ status: 'error while saving', message: err });
        res.json({
            status: 'success',
            message: 'POST state',
            data: state,
        });
    });
};
