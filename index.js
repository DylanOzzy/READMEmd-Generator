// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
// TODO: Create an array of questions for user input
const questions = [  
  inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is the name of your project?",
    },
    {
      type: "input",
      name: "Description",
      message: "How would you describe your project?",
    },
    {
      type: "input",
      name: "tableOfContents",
      message: "What will be included in your table of contents?",
    },
    {
      type: "input",
      name: "installation",
      message: "How can your project be installed?",
    },
    {
      type: "input",
      name: "usage",
      message: "How does a user navigate the application?",
    },
    {
      type: "list",
      name: "license",
      message: "Which license would you like to use?",
      choices: ['GNU AGPLv3', 
      'GNU GPLv3', 
      'GNU LGPLv3', 
      'Mozilla Public License 2.0', 
      'Apache License 2.0', 
      'MIT License', 
      'Boost Software License 1.0', 
      'The Unlicense',]
    },
    {
      type: "input",
      name: "contribution",
      message: "How can other developers contribute to the project?",
    },
    {
      type: "input",
      name: "tests",
      message: "What are your instructions for testing the application?",
    },
    {
      type: "input",
      name: "questions",
      message: "Any Questions about this README.md Generator, contact me.",
    },
  ])
  .then((data) => {
    const folderPath = './data-storage';
    const fileName = `${data.projectName.toLowerCase().split(' ').join('')}.json`;
    const filePath = path.join(__dirname, folderPath, `${fileName}`);
    fs.writeFile(filePath, JSON.stringify(data, null, '\t'), (err) =>
    err ? console.log(err) : console.log('Success!')
    )})
  ];
  
  // TODO: Create a function to write README file
  function writeToFile(fileName, data) {}
  
  // TODO: Create a function to initialize app
function init() {

}

// Function call to initialize app
init();
