var inquirer = require("inquirer");
const axios = require("axios");
var fs = require('fs');

inquirer
.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the name of your repository?"
    },{
        type: "input",
        name: "summary",
        message: "Give a short summary of your project"
    },{
        type: "input",
        name: "description",
        message: "What does the project do?"
    },{
        type: "input",
        name: "installation",
        message: "What will a user need to install to use the application?"
    },{
        type: "input",
        name: "usage",
        message: "How does the project function?"
    },{
        type: "input",
        name: "license",
        message: "Which licenses will you be attaching to the project?"
    },{
        type: "input",
        name: "contributing",
        message: "Who else contributed to the project?"
    },{
        type: "input",
        name: "tests",
        message: "List any tests that pertain to the project."
    },{
        type: "input",
        name: "githubUsername",
        message: "What is your Github Username?"
    }
]).then(function(data) {
  
const readMe = 
`# ${data.title}
${data.summary}
<a href='https://github.com/${data.githubUsername}/${data.title}/pulls'>
<img src='https://img.shields.io/badge/Pulls-Welcome-brightgreen' alt='badge'>
</a>
    
## Description
${data.description}
    
### Table of Contents
I. Title
II. Description
III. Table of Contents
IV. Installation
V. Usage
VI. License(s)
VII. Contributing
VIII. Test(s)
IX. Questions
    
## Installation
${data.installation}
    
## Usage
${data.usage}

## License(s)
${data.license}
    
## Contributing
${data.contributing}

## Test(s)
${data.tests}

## Questions
If you have any questions, please feel free to contact me below.
`
  
    fs.writeFile(`README.md`, readMe, function(err) {
  
      if (err) {return console.log(err)};
  
      console.log("Success!");
  
    });
const queryUrl = `https://api.github.com/users/${data.githubUsername}`;
axios.get(queryUrl).then(function(res) {
const user = res.data;
const githubProfile = 
`
<a href='${user.html_url}'>${user.login}</a>
<img src='${user.avatar_url}' alt='github avatar'>
${user.email}
`
    fs.appendFile(`README.md`, githubProfile, function(err) {
        if (err) {throw err};

        console.log(`Added Github Info`);
    });
});
});



