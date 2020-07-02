// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");

class Intern extends Employee {
    constructor (name, id, email, school) {
        super (name, id, email);
        this.school = school;
        this.role = this.constructor.name;
    }

}

Intern.prototype.getSchool = function() {
    return this.school;
}

Intern.prototype.getRole = function() {
    return this.role;
}


module.exports = Intern;