const { debug } = require('console');
const chalk =require('chalk');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on("line",(line)=>{
    if(line == "help" || line=="h")
    {
man()
    }
})



function man()
{
    console.log(chalk.blueBright("This program manage files and give access to them via json on a webserver, mainly used for the owllauncher"))
}