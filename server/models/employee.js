module.exports = function(Employee) {

    //MODEL HOOKS

    Employee.observe('before save', function(ctx, next){
        if (ctx.instance) {
            ctx.instance.updated = new Date();
        } else {
            ctx.data.updated = new Date();
        }
        next();
    });


    //REMOTE METHODS

    Employee.getAllNames = function(cb){
        Employee.find({fields: {name: true}},cb);
    };

    Employee.remoteMethod('getAllNames', {
        http: {verb: 'get'},
        returns: {type: 'array', root: true}
    });

    Employee.prototype.sayHello = function(yourName, cb){
        cb(null, this.name + " says HELLOOOO " + yourName || ".");
    };

    Employee.remoteMethod('sayHello', {
        isStatic: false,
        http:{path:'/sayHello', verb: 'get'},
        accepts: {arg: 'yourName', type: 'string'},
        returns: {type: 'string', name: 'response'}
    });
};
