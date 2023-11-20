// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs").promises;
const path = require("path");
const { error } = require("console");
const userData = {};
// In Progess
let {
  renderLicenseSection,
} = require("./utils/generateMarkdown");

const promptUser = async () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "projectName",
        message: "What is the name of your project?"
      },
      {
        type: "input",
        name: "description",
        message:
          "How would you describe your project? (Enter N/A if not required)"
      },
      {
        type: "input",
        name: "installation",
        message:
          "How can your project be installed? (Enter N/A if not required)"
      },
      {
        type: "input",
        name: "usage",
        message:
          "How does a user navigate the application? (Enter N/A if not required)"
      },
      {
        type: "list",
        name: "license",
        message: "Which license would you like to use? (Enter N/A if not required)",
        choices: [
          { title: 'MIT License', value: 'MIT' },
          { title: 'Mozilla Public License 2.0', value: 'MPL2.0' },
          { title: 'The Unlicense', value: 'Unlicense' }
        ],
      },
      {
        type: "input",
        name: "contribution",
        message:
          "How can other developers contribute to the project? (Enter N/A if not required)"
      },
      {
        type: "input",
        name: "tests",
        message:
          "What are your instructions for testing the application? (Enter N/A if not required)"
      },
      {
        type: "input",
        name: "github",
        message:
          "Enter your GitHub username so contributors can contact you about the project."
      },
      {
        type: "input",
        name: "email",
        message:
          "Enter your E-Mail so contributors can contact you about the project."
      },
    ])
    .then((data) => {
      Object.assign(userData, data);
      return userData;
    });
};
// In Progess
const generateMarkdown = async (userData) => {
  const licenseSection = renderLicenseSection(userData.license);
  const readmeContent = `# ${userData.projectName}
  [![License: ${userData.license}](https://img.shields.io/badge/License-${userData.license}-yellow.svg)](https://opensource.org/licenses/${userData.license}) 
    
  ## Table of Contents
  
  - [Project Description](#project-description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribution](#contribution)
  - [Tests](#tests)
  - [Contact For Questions](#contact-for-questions)
  - [License](#license)

  
  ## Project Description
  
  ${userData.description}
  
  ## Installation
  
  ${userData.installation}
  
  ## Usage
  
  ${userData.usage}
  
  
  ## Contribution
  
  ${userData.contribution}
  
  ## Tests
  
  ${userData.tests}
  
  ## Contact For Questions
  
  Please reach out to me for any inqires about this project through a GitHub message or an E-Mail!
  - Github: [${userData.github}](https://github.com/${userData.github}/)
  - E-Mail: <${userData.email}>

  ## License
  
  ${licenseSection}`;

  return readmeContent;
};

const handleSaveJson = async () => {
  const saveJson = "./data-storage";
  const fileName = `${userData.projectName
    .toLowerCase()
    .split(" ")
    .join("")}.json`;
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
