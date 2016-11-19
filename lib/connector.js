
var Slack = require('./slack');
var slack = new Slack(process.env.SLACK_TOKEN);
var io = require('./socketio');
var id = 1;
var listeningChannel = "general";

slack.on('message', function(message) {
  console.log("Message:", message.user.name, message.channel.name, message.text);
  if (/^[Qq]:/.test(message.text) && message.channel.name === listeningChannel) {
    io.emit('message', {
      text: message.text,
      username: message.user.name,
      channel: message.channel.channel,
      id: id++
    });
  } else if (/^Come here chat reflector 9000/i.test(message.text)) {
    slack.sendMessage(listeningChannel, "Later scrubs.", console.log);
    slack.sendMessage(message.channel.id, "Hey!.. I'm here.", console.log);
    listeningChannel = message.channel.name;
  }
});
