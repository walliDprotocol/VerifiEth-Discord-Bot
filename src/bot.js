const Discord = require('discord.js');
const util = require('ethereumjs-util');
const crypto = require('crypto');
const client = new Discord.Client();
const eth_utils = require('eth-sig-util');

//https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/frequently-asked-questions.md

const BASE_LINK = 'https://www.wallid.io/Setup/Download/?'
const BOT_USERNAME = 'WalliD VerifiEth';
let SERVER_ID    =  ''
let CHANNEL_ID   = ''
const verification_channel = 'identity-verification'
const bot_version = '0.3'

const PUBLIC_MGS = '@##__USERNAME__## has just been VerifiEth for the following wallet address✅: ##__MESSAGECONTENT__##'

const   WELCOME_MESSAGE    = 'Hi ##__USERNAME__## , \n\nYou need your Discord ID associated with an Ethereum address in a MyWalliD wallet in order to verify your account on ##__SERVERNAME__##.\nIf you already have it type !verify followed by the link with a proof of ID generated within MyWalliD to complete the verification.\nIf you don’t have a MyWallID yet type: !start';
const BOT_WRONG_COMMANDS = 'Command not recognised.\n\nPlease use one of the following commands:\n!start. - To setup MyWalliD and store Discord ID\n!prove <signatures generated within MyWalliD/BuildID/DIscord>\n!verify <link proof Discord ID MyWalliD> - to complete the verification\n!help - Display FAQ’s and tutorials\n';
const VERIFY_MESSAGE = 'You’ve been successfully verified!';
const SUPPLY_WALLET = 'Follow this link and sign your Discord ID with your Ethereum wallet address with MyWalliD wallet'

const GET_START      = 'Get MyWalliD and store your Discord ID  here:\n\n##__LINK__##.'
const PROOF_COMPLETE = 'Your account was successfully verified for ##__SERVERNAME__##.  Paste the link below in your MyWalliD and prove your Discord ID and Ethereum address ownership whenever you like: ##__LINK__##'

const HELP_COMMANDS = 'Bot commands:\n\n!start. - To setup MyWalliD and store Discord ID - You’ll be directed to WalliD’s website in order to setup MyWalliD and create or import an Ethereum Wallet address. \
\n\n !prove <signatures generated within MyWalliD/BuildID/DIscord> -  Once your Discord username is provided on the Build identity section within MyWalliD, you’ll be able to sign the\
username with your wallet keys. A message with that signature will be provided to you. Paste it right in front of the command !prove. WallID Verify will paste it on <servername>’s \
#verifieth-identity channel to act as a verifiable proof for the server.\n\n\
!verify <link proof Discord ID MyWalliD> - If you already have this Discord account in MyWalliD, access your wallet plug-in, go to your Discord ID and generate a link with a proof of ID. Paste it in front of the command !verify and instantly complete the verification process'

const proof_fail = 'The verification for this account failed. Make sure you’re signing this Discord username on MyWalliD and type !prove <message generated within MyWalliD - wallid.io/Setup/ChooseIdentity\n\n example: !prove Wallet address:0xc28e8205f33138db7efd0923cb82c91da265e47e Wallet signature:0x94dbc9feb4e4ed465fc01e506a4964328828782be72f170daa5309789dc2153962dc8a08e6636821d2a17547eb382b2def58d00e778d34c9c9bf987b4d9889e51bDiscordID: Filipe VeigaDiscordIDsignature: 0x94dbc9feb4e4ed465fc01e506a4964328828782be72f170daa5309789dc2153962dc8a08e6636821d2a17547eb382b2def58d00e778d34c9c9bf987b4d9889e51b'


// client.on('ready', () => 
// {
// 	console.log(`Logged in as ${client.user.tag}!`);
//   console.log('Bot version ', bot_version);
//     client.user.setActivity("   ", { type: "   "})
// });

client.on('interaction', async interaction => 
{
  // console.log('Command interation ', interaction.commandName );
	if (!interaction.isCommand()) return;
  // console.log('Command interation ', interaction.commandName );
	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

client.on("message", msg => 
{
    
     if(msg.channel.type &&  msg.channel.type == 'dm' && !(msg.author.username == BOT_USERNAME)  )
     {
        parseCommand(msg)
     }
     else if( (msg.author.username == BOT_USERNAME) )
     {

     }
})


client.on("guildMemberAdd", (member) => {
    console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );

    let welcome = WELCOME_MESSAGE.replace('##__USERNAME__##' , member.user.username );
    welcome = welcome.replace('##__SERVERNAME__##' , member.guild.name);

    member.send(welcome);     

});


//parse commands from user input
function parseCommand(message)
{
   const args = message.content.split(" ");
   if(args && args.length > 0)
   {
      if(args[0] == '!start' )
      {
        startWithLink(message, args[1], message.author.username, message.author );

      }else if(args[0] == '!prove')
      {
        proxyMessageToGuild(message, message.content.replace(args[0], '') , message.author.username, message.author.id, true );
        // message.author.send("Thanks to your verify link!")

      }
      else if(args[0] == '!verify')
      {
        proxyMessageToGuild(message, message.content.replace(args[0], '') , message.author.username, message.author.id, false );

      }else if(args[0] == '!message')
      {
        proxyMessageToGuild(message, args[1] , message.author.username, message.author.id , false);

      }
      else if(args[0] == '!help')
      {
        message.author.send(HELP_COMMANDS)

      }else{
        message.author.send(BOT_WRONG_COMMANDS)
      }
   }
   else{
     message.author.send(BOT_WRONG_COMMANDS)
   }

}

/**
 * Verify user wallet announce if fit the requirements
 * @param {*} message 
 * @param {*} content 
 * @param {*} username 
 * @param {*} user_id 
 * @param {*} isProve 
 */
function  proxyMessageToGuild(message, content, username, user_id, isProve)
{

    const server_id = SERVER_ID;
    const myGuild = client.guilds.cache.get(server_id);
    const myRole = myGuild.roles.cache.find(role => role.name === 'member');

    myGuild.members.fetch({force: true})
      .then((data) => 
      {
         data.array().forEach(member => 
          {
            //grab user from server that sent message
            if(member.user.id ==  user_id){

              let isLegit =  isProve ?  verifyUserSignature(member.user.id, content) : verifyUserByLink(member.user.id, content);

              if(isLegit)
              {
                //grab the announce channel
                let announceChannel = member.guild.channels.cache.find(c => c.id === '839172269883260961' );
                //assign role to user
                member.roles.add(myRole.id);
                //send message to verify group
                let public_content = PUBLIC_MGS.replace('##__USERNAME__##', member.user.username);
                public_content = public_content.replace('##__MESSAGECONTENT__##', content);
                announceChannel.send(public_content).then(msg => 
                {
                  let messagelink = 'https://discord.com/channels/' + msg.channel.guild.id + '/' + msg.channel.id + '/' + msg.id

                  let verified_process =  PROOF_COMPLETE.replace('##__SERVERNAME__##', myGuild.name );
                  verified_process = verified_process.replace('##__LINK__##' , messagelink );
                  message.author.send(verified_process);
                });
                
                // console.log(" PERMISSION role manager ", member.guild.me.hasPermission("MANAGE_ROLES")  );
                // console.log(" PERMISSION admin", member.guild.me.hasPermission("ADMINISTRATOR")  );

              }
              else{
                message.author.send(proof_fail)
              }

            }
         });

      })
      .catch(console.error);
}

function verifyUserByLink(user_id, content){


}





function getOnboardingLink(author)
{
  let link = BASE_LINK + 'username=' + encodeURIComponent(author.username)
  link += '&user_id=' + author.id
  link += '&user_tag=' + encodeURIComponent(author.tag)
  link += '&onboarding=discord'
  return link;
}

function startWithLink(message, wallet, username, author)
{
  let final =  GET_START.replace('##__LINK__##', getOnboardingLink(author) );
  //encrypt username with wallet address
  message.author.send(final)
}


/*
    Verify user sign with WA
 */
function verifyUserSignature(user_id,  messageContent)
{
  

  try
  {
    console.log('*****************verifyUserSignature *****************');

    let signature = messageContent.match(/(Account ID signature:[A-Za-z0-9]+)/g)[0].split(':')[1]
    let  wa = messageContent.match(/(Wallet address:[A-Za-z0-9]+)/g)[0].split(':')[1]

    let generated_sign = wa + ':' + user_id;

    // console.log('WA -> ', wa);
    // console.log('Signature -> ', signature);
    // console.log('Generated Sign -> ', generated_sign);

    // let sign_check = checkSignature( generated_sign , signature)
    let sign_check =  eth_utils.recoverPersonalSignature({
      data: generated_sign,
      sig: signature,
    })

    console.log('Sign Check return ', sign_check);
    return sign_check == wa;

  }
  catch(ex){
     console.log('error validation signature ', ex)
    return false;
  }

}




module.exports = 
{
  start : function(token, server_id, channel_id)
  {
      SERVER_ID = server_id;
      CHANNEL_ID = channel_id;
      console.log('********** Start Bot Script **********' );
      client.login(token);
     
  }
}