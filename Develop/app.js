const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let employees = [];

inquirer
    .prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?"
        },
        {
            type: "input",
            name: "managerId",
            message: "What is your manager's id?"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email?"
        },
        {
            type: "input",
            name: "managerOfficeNum",
            message: "What is your manager's office number?"
        }])

    .then(function (response) {
        let newManager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficeNum);
        employees.push(newManager);
        anotherEmployee();
    });


function anotherEmployee() {

    let engineerPrompt = ([
        {
            type: "input",
            name: "engineerName",
            message: "What is your engineer's name?"
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is your engineer's id?"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is your engineer's email?"
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is your engineer's GitHub account?"
        }
    ])
    let internPrompt = ([
        {
            type: "input",
            name: "internName",
            message: "What is your intern's name?"
        },
        {
            type: "input",
            name: "internId",
            message: "What is your intern's id?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is your intern's email?"
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is your intern's school?"
        }
    ])

    inquirer
        .prompt([
            {
                type: "list",
                name: "addNewEmployee",
                message: "Which type of team member would you like to add?",
                choices: ["Engineer", "Intern", "I don't want to add any more team members"]
            }
        ])
    .then (function(newEmployee) {
        if (newEmployee.addNewEmployee === "Engineer") {
            inquirer.prompt(engineerPrompt)
            .then(function(response){
                let newEngineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub);
                employees.push(newEngineer);
                // Make new employee and push
                anotherEmployee();
            })

        }
        else if (newEmployee.addNewEmployee === "Intern") {
            inquirer.prompt(internPrompt)
            .then(function(response){
                let newIntern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
                employees.push(newIntern);
                // Make new employee and push
                anotherEmployee();
            })
        }
        else {
            var html = render(employees);
            fs.writeFile("team.html", html, err => {
                if (err) {
                    console.log(err);
                }
                console.log("Your file 'team.html' has been created!");
            })
        }
    })

}
