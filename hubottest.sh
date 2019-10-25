#!/usr/bin/expect -f
# usage: ./hubottest "hubot help"
spawn -noecho bin/hubot
sleep 3
expect "Hubot>"
send "hubot [lrange $argv 0 10]\n"
expect eof
