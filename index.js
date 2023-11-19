// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs").promises;
const path = require("path");
const { error } = require("console");
const userData = {};

const promptUser = async () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "projectName",
        message: "What is the name of your project?",
      },
      {
        type: "input",
        name: "description",
        message: "How would you describe your project? (Enter N/A if not required)",
      },
      {
        type: "input",
        name: "installation",
        message: "How can your project be installed? (Enter N/A if not required)",
      },
      {
        type: "input",
        name: "usage",
        message: "How does a user navigate the application? (Enter N/A if not required)",
      },
      {
        type: "list",
        name: "license",
        message: "Which license would you like to use?",
        choices: [
          "GNU AGPLv3",
          "GNU GPLv3",
          "GNU LGPLv3",
          "Mozilla Public License 2.0",
          "Apache License 2.0",
          "MIT License",
          "Boost Software License 1.0",
          "The Unlicense",
          "No License",
        ],
      },
      {
        type: "input",
        name: "contribution",
        message: "How can other developers contribute to the project? (Enter N/A if not required)",
      },
      {
        type: "input",
        name: "tests",
        message: "What are your instructions for testing the application? (Enter N/A if not required)",
      },
      {
        type: "input",
        name: "contact",
        message: "How can contributors contact you about the project? (Enter N/A if not required)",
      },
    ])
    .then((data) => {
      Object.assign(userData, data);
      return userData;
    });
};

const generateMarkdown = async (userData) => {
  const readmeContent = `# ${userData.projectName}

  ## Table of Contents
  
  - [Project Description](#project-Description)
  - [Installation](#Installation)
  - [Usage](#Usage)
  - [License](#License)
  - [Contribution](#Contribution)
  - [Tests](#Tests)
  - [Contact](#Contact)
  
  
  ## Project Description
  
  ${userData.description}
  
  ## Installation
  
  ${userData.installation}
  
  ## Usage
  
  ${userData.usage}
  
  ## License
  
  ${userData.license} 
  
  ## Contribution
  
  ${userData.contribution}
  
  ## Tests
  
  ${userData.tests}
  
  ## Contact
  
  ${userData.contact}`;
  return readmeContent;
};

const handleSaveJson = async () => {
  const saveJson = "./data-storage";
  const fileName = `${userData.projectName.toLowerCase().split(" ").join("")}.json`;
  const jsonPath = path.join(__dirname, saveJson, `${fileName}`);
  fs.writeFile(jsonPath, JSON.stringify(userData, null, "\t"));
};

const handleSaveReadme = async () => {
  const readmeContent = await generateMarkdown(userData);
  const saveReadme = "./new-readme/";
  const fileName = `${userData.projectName}.md`;
  const readmePath = path.join(__dirname, saveReadme, `${fileName}`);
  fs.writeFile(readmePath, readmeContent);
};

promptUser()
  .then(() => {
    handleSaveJson();
    return handleSaveReadme();
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = userData;