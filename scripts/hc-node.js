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

        res.send(`Deployment Started! for *${repo}* for branch: \`${branch}\` in env: \`${env}\` :smile :+1:`)
        setTimeout(() => {
            res.send("Node Deploy! done!")
        }, 1000);
    })
} 
