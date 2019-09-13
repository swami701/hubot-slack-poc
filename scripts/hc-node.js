let cmd = require('node-cmd')
let child = require('child_process');
module.exports = (robot) => {
    robot.respond(/deploy (.*) (.*) (.*)/i, (res) => {
        let repo = res.match[1]
        let branch = res.match[2]
        let env = res.match[3]
        switch (repo) {
            case 'hwn':
                repo = 'node-hello-world'
                break;
        
            default:
                repo = undefined
                break;
        }
        if (!repo) {
            res.send(`Invalid Repo Name: ${res.match[1]} :disappointed:`)
            return
        }

        res.send(`Deployment Started! for \`${repo}\` for branch: \`${branch}\` in env: \`${env}\` :smile :+1:`)

        if (repo === 'node-hello-world') {
            cmd.get(
                `
                cd /home/swami/Documents/deploy/node-hello-world
                pwd
                git pull
                git checkout ${branch}
                npm i
                docker build -t hwn .;
                `,
                function(err, data, stderr){
                    res.send(`\`\`\`${data}\`\`\``)
                    child.exec('docker stop hwn; docker rm hwn; docker run -itd -p 3000:3000 --name=hwn hwn', (err, stdout, stderr) => {
                        if (err) {
                          //some err occurred
                          res.reply(`\`\`\`${err}\`\`\``)
                          res.reply("Failed deployment! :disappointed:")
                        } else {
                         // the *entire* stdout and stderr (buffered)
                         console.log(`stdout: ${stdout}`);
                         console.log(`stderr: ${stderr}`);
                         res.send(`\`\`\`${stdout}\`\`\``)
                        }
                        res.reply(`Deployment Done! :+1:`)
                    });
                }
            );
        }
    })
} 
