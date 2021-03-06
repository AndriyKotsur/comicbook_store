const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/', userController.getUser);
router.post('/sign-up', urlencodedParser, userController.signUpUser);
router.post('/sign-in', urlencodedParser, userController.loginUser);
router.delete('/:id', urlencodedParser, userController.deleteUser);

module.exports = router;