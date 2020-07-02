// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");

class Manager extends Employee {
    constructor (name, id, email, officeNum) {
        super (name, id, email);
        this.officeNumber = officeNum;
        this.role = this.constructor.name;
    }

}

Manager.prototype.getOfficeNumber = function() {
    return this.officeNumber;
}

Manager.prototype.getPosition = function() {
    return this.position;
}

Manager.prototype.getRole = function() {
    return this.role;
}


module.exports = Manager;
