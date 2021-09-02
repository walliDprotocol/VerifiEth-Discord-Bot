<h1> WalliD VerifiEth - Discord bot for identity verifications based on Ethereum wallet addresses</h1>

<h2>About</h2>

WalliD Verifieth is a Discord bot that verifies Discord users Ethereum wallet addresses, social network account IDs or blockchain assets' ownership before awarding a specific role on a Discord channel.
WalliD VerifiEth interacts with the users via direct message (DM) in order to request the intended proofs of identity. 
This proofs are generated within a MyWalliD web3 wallet. Anyone can install MyWalliD browser plug-in and create or import an Ethereum wallet address as well as associate a social network account and other identities with that address.

Current version of WallID VerifiEth allows:

- Verification Discord ID and Ethereum wallet address
- authomatic role awarding after verification <verifieth member role>

V2 will allow
<ul>
  <li>integration on other Discord Servers</li>
  <li>customisation of role awarding</li>
  <li>Trigerring bot interaction from a generic ./command on designated channels within the server</li>
</ul>


V3 will allow
<ul>
  <li>customisation of verified IDs - server admin is able to configure wich identities or blockchain assets should be verified</li>
  <li>customisation of verification output - such as, badge award, nft drop or any other reward</li>
</ul>  
<h3> try it out on <a href="https://discord.gg/e9EfXeNeC9">WalliD's Discord</a></h3>

<h2>How to use</h2>
                        




https://user-images.githubusercontent.com/39834004/128215621-058ee58e-f6e2-469c-8326-7c03a23fd1db.mp4



<h3>Walkthrough</h3>
  
<h4><b>A) Get VerifEth on a Discord Channel</b> </h4> 

- 1. WalliD VerifiEth bot will start a DM once you land on WalliD's Discord server;
- 2. type `!start` - the bot will reply with a link to MyWalliD with your Discord account ID info within;
- 3. Download MyWalliD plug-in - from Google or Brave browser stores;
- 4. Import or create a new Ethereum wallet address - Import with existing seed phrase;
- 5. Sign your Discord ID with your Ethereum private keys using MyWallID interface;
- 6. Go back to Discord and reply WalliD VerifiEth bot with `!prove` and that Discord ID signature;
- 7. WalliD VerifiEth bot will verify the signature and paste that proof on WalliD's #identity-verification channel - it will also send you the link to that post via DM
  
<h4><b>B) Store your Discord ID in your Ethereum wallet</b></h4> 
 
 - 8. Paste the verification link provided by VerifiEth bot on MyWalliD's interface and store your Discord ID there.
  
  
<h4><b>C) Get VerifEth on another Discord Channel </b></h4> 

- 9. Next time you're required to verify your identity with VerifiEth bot on another channel all you need to do reply is `!verify` and add your proof of identity;
- 10. Discord's Proof of identity can be generated on MyWalliD's interface on the "online IDs" section.


# Admin Setup

List of commands to configure the bot!

### !setup verifieth
Initial bot setup. The user who type this command will be the admin of the bot. 
obs: When user type this command from a channel this channel (and all the members) are able to send configurations commands to the bot.

### !setup list
List all configuration from server

### !setup config-channel <channel_name>
Define a channel where validation commands can be sent
Obs: Can be set if the command !setup is executed on this channel 

### !setup verification-channel <channel_name>
Define the channel where users start the onboarding process also where they will post validation messages

### !setup wallet "output role"
ex: !setup wallet "Enji Token Holder" <br>
Define a role of a user once is wallet is verified by WalliD

### !setup erc20 <contract_address> "Project Name" "Role of Owner"
ex: !setup erc20 0x0d8775f648430679a709e98d2b0cb6250d2887ef "BAT Token" "Bat Token Holder" <br>
Define the channel where users start the onboarding process also where they will post validation messages

### !setup remove erc20 <contract_address>
Remove ERC20 configuration

### !setup erc721 <contract_address> "Project Name" "Role of Owner"
ex: !setup erc721 0x0d8775f648430679a709e98d2b0cb6250d2887ef "Sup Ducks" "Sup Duck Owner" <br>
Define the channel where users start the onboarding process also where they will post validation messages

### !setup remove erc721 <contract_address>
Remove ERC721 configuration

### !setup erc1155 <contract_address> <nft_id> "Project Name" "Role of Owner"
ex: !setup erc1155 0x495f947276749Ce646f68AC8c248420045cb7b5e "Tiny Turtle" "Tiny Turtle Owner"<br>
Define the channel where users start the onboarding process also where they will post validation messages

### !setup remove erc1155 <contract_address>
Remove ERC1155 configuration

  
