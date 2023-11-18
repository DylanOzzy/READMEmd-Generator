// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs").promises;
const path = require("path");
const readmeTemplate = require("./utils/README-Template");
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
        message: "How would you describe your project?",
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
        message: "How can other developers contribute to the project?",
      },
      {
        type: "input",
        name: "tests",
        message: "What are your instructions for testing the application?",
      },
      {
        type: "input",
        name: "contact",
        message: "How can contributors contact you about the project?",
      },
    ])
    .then((data) => {
      Object.assign(userData, data);
    });
};

// in progress
const generateMarkdown = async (userData) => {
  await promptUser();
  const readmeContent = readmeTemplate(userData);
  console.log(readmeContent);
};

const handleFileSystem = async (userData) => {
  await promptUser();
  await generateMarkdown(userData);
  const folderPath = "./data-storage";
  const fileName = `${userData.projectName
    .toLowerCase()
    .split(" ")
    .join("")}.json`;
  const filePath = path.join(__dirname, folderPath, `${fileName}`);
  fs.writeFile(filePath, JSON.stringify(userData, null, "\t"));
  return fileName;
};

// in progress
const writeMarkdownToFile = async (userData) => {
  await generateMarkdown();
  const folderPath = "./new-readme/";
  const fileName = `${userData.projectName}.md`;
  const readmePath = path.join(__dirname, folderPath, `${fileName}`);
  fs.writeFile(readmePath, readmeTemplate);

};
writeMarkdownToFile();