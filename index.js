const inquirer = require('inquirer');
const initialQuestion = require('./question')

const init = () => {inquirer.prompt(initialQuestion).then((data) => {
    console.log(data)
})}

init()