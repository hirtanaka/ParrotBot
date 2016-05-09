
if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('./lib/Botkit.js');

var controller = Botkit.slackbot({
    debug: true,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();

// 何か話しかけると会話を開始
controller.hears(['.*'], 'ambient, direct_mention, mention', function(bot, message){
  bot.startConversation(message, function(err, convo) {
    convo.say('Hello');

    // parrot bot
    convo.ask('', function(response, convo) {
      convo.say(response.text);
      convo.repeat();
      convo.next();
    });

  });

});
