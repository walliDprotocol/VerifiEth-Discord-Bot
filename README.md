<h1> WalliD VerifiEth - Discord bot for identity asset verification based on Ethereum wallet addresses</h1>

<h2>About</h2>

WalliD Verifieth is a Discord bot that verifies multiple ID assets associated with a MyWalliD wallet address (ETh address, ERC20, ER721, decentralized credentials or Legaacy IDs) and awards server roles to verified members.
WalliD VerifiEth interacts with the users via direct message (DM) in order to request and validate ID assets.
These proofs are generated within a MyWalliD web3 wallet. Anyone can install MyWalliD browser extension and create or import an Ethereum wallet address as well as manage their ID portfolio and assets.

Current version of WallID VerifiEth (V3) allows:

- Verification Discord ID and Ethereum wallet address;
- Verification of multiple ERC-20 tokens ownership;
- Verification of multiple ERC-721 assets ownership;
- Verification of multiple ERC-1155 assets ownership;
- Role awarding per asset verification.

Next version of VerifiEth bot will allow
<ul>
  <li>Verification of every ID asset within MyWalliD weelits - server admin is able to configure wich identities or blockchain assets should be verified</li>
  <li>customisation of verification result - such as a badge issuance, nft drop or any other reward</li>
</ul>  
<h3> Try it out on <a href="https://discord.gg/e9EfXeNeC9">WalliD's Discord</a></h3>

<h2>How it works</h2>
                        


https://user-images.githubusercontent.com/39834004/128215621-058ee58e-f6e2-469c-8326-7c03a23fd1db.mp4



<h3>Walkthrough</h3>

<h4><b>A) Get and verify a Discord ID asset </b></h4> 
  
- 1. WalliD VerifiEth bot will start a DM once you land on WalliD's Discord server;
- 2. type `!start` - the bot will reply with a link to MyWalliD with your Discord account ID info within;
- 3. Download MyWalliD plug-in - from Google or Brave browser stores;
- 4. Import or create a new Ethereum wallet address - Import with existing seed phrase;
- 5. Sign your Discord ID with your Ethereum private keys using MyWallID interface;
- 6. Go back to Discord and reply WalliD VerifiEth bot with `!prove` and that Discord ID signature;
- 7. WalliD VerifiEth bot will verify the signature and paste that proof on WalliD's #identity-verification channel - it will also send you the link to that post via DM
  
<h4><b>B) Store your Discord ID in MyWalliD</b></h4> 
 
 - 8. Paste the verification link provided by VerifiEth bot on MyWalliD's interface and store your Discord ID there.
  
  
<h4><b>C) Get VerifEth on another Discord Channel </b></h4> 

- 9. Next time you're required to verify your identity with VerifiEth bot on another channel all you need to do reply is `!verify` and add your proof of identity;
- 10. Discord's Proof of identity can be generated on MyWalliD's interface on the "online IDs" section.


<h2> Setting VerifiEth bot in your server </h2>

<h3>Install the bot in a server</h3> 

Get the bot in your server <a href="https://discord.com/api/oauth2/authorize?client_id=869586095501877279&permissions=275146352688&redirect_uri=https%3A%2F%2Fwallid.io%2F&response_type=code&scope=guilds%20bot"> in this link</a> and approve the pre-selected permissions.
  
<h3>Customise bot's verifications with the following command list<h3>

### !setup verifieth
Starts bot configuration. 
note: When user types this command in a given channel, all members inside are able to use configurations commands for the bot.

### !setup list
Lists all setup commands and their instructions.

### !setup config-channel <channel_name>
Choose a channel where validation commands can be sent
Obs: Can be set if the command !setup is executed on this channel 

### !setup verification-channel <channel_name>
Choose a channel where members will interact with the bot in order to trigger their verifications.

### !setup wallet "output role"
Sets up wallet verification parameters. With this command the bot will check if the user owns an Ethereum wallet address and award the role defined in quotes once the verification is succesfull.<br>
eg. !setup wallet "Verified Member".


### !setup erc20 <contract_address> "Project Name" "Role of Owner"
Sets up ERC-20 verification parameters. With this command the bot will check if the user owns an Ethereum wallet address with the specified ERC-20 token in it (min amount > 0) and award the role defined in quotes once the verification is succesfull.<br>g
eg. !setup erc20 0x0d8775f648430679a709e98d2b0cb6250d2887ef "BAT Token" "Bat Token Holder" 

### !setup remove erc20 <contract_address>
Deletes !setup erc20 configuration for the specified asset.

### !setup erc721 <contract_address> "Project Name" "Role of Owner"
Sets up ERC-721 verification parameters. With this command the bot will check if the user owns an Ethereum wallet address with at least one NFT from the specified ERC-721 contract address and award the role defined in quotes once the verification is succesfull.<br>
eg. !setup erc721 0x0d8775f648430679a709e98d2b0cb6250d2887ef "Sup Ducks" "Sup Duck Owner" 

### !setup remove erc721 <contract_address>
Deletes !setup erc721 configuration for the specified asset.

### !setup erc1155 <contract_address> "Project Name" "Role of Owner"
Sets up ERC-1155 verification parameters. With this command the bot will check if the user owns an Ethereum wallet address with at least one NFT from the specified ERC-1155 contract address and award the role defined in quotes once the verification is succesfull.<br>
eg. !setup erc1155 0x495f947276749Ce646f68AC8c248420045cb7b5e "Tiny Turtle" "Tiny Turtle Owner"<br>


### !setup remove erc1155 <contract_address>
Deletes !setup erc1155 configuration for the specified asset.

### Notes: 
  - "Project Name" field will be used by the bot when DMing a member in order to announce the assets it will be verifying. Admins may customise it freely
  - "Role of Owner" needs to be the same as an existing role within the server       
