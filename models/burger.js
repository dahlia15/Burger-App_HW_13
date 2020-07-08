var orm = require("../config/orm");

var burger = {
    all: function(cb) {
        orm.all("burgerList", function(res) {
            cb(res);
        })
    },
    create: function(cols, vals, cb) {
        orm.create("burgerList", cols, vals, function(res) {
            cb(res);
        })
    },
    update: function(objColVals, condition, cb) {
        orm.update("budgerList", objColVals, condition, function(res) {
            cb(res);
        })
    }
};

module.exports = burger;