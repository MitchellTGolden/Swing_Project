const LogRegController = require('../controllers/auth.controller'),
    SwingController = require('../controllers/swing.controller'),
    {authenticate} = require('../config/jwt.config.js');

module.exports = (app) => {
    app.post('/api/register', LogRegController.register)
    app.post('/api/login', LogRegController.login)
    app.get('/api/users', authenticate, SwingController.userIndex)
    app.get('/api/logout', authenticate, LogRegController.logout)
}