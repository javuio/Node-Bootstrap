/**
 * Created by Daniel on 1/1/2015.
 */

//var userDAO = require('../../dao/dashboard.js');

function createAPI(app) {
    var apiHandler = require('../../apiHandler.js');
    var dashboard = new apiHandler('/api/controlPanel/dashboard');
    dashboard.requiresPermission = 'ControlPanelAccess';

    dashboard.validateData = function (req, res) {
        return true;
    };

    dashboard.get = function (req, res) {
        console.log('got dash');
        res.json({});
    };

    return dashboard;
}
module.exports = createAPI;

