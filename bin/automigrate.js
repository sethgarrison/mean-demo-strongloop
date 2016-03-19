var path = require('path');

var employees = require('./test_employees');
console.log("employees", employees);

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.l4MeanDemo;
ds.automigrate('Employee', function(err) {
    if (err) throw err;

    var count = employees.length;
    employees.forEach(function(employee) {
        app.models.Employee.create(employee, function(err, model) {
            if (err) throw err;

            console.log('Created:', model);

            count--;
            if (count === 0)
                ds.disconnect();
        });
    });
});