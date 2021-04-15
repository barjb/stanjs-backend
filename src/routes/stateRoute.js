const router = require('express').Router();
const stateController = require('../controllers/stateController');

router.route('/state/stats').get(stateController.getStats);
router.route('/state/form').get(stateController.getFormOptions);
router.route('/state/form').post(stateController.postState);

module.exports = router;
