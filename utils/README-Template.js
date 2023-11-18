const readMe = () => {
  let readmeTemplate = (userData) =>
    `# ${userData.projectName}

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

${userData.contact}

`;
};
module.exports = readMe;
