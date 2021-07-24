const Discord = require('discord.js');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const Parse = require('rss-parser');
const feed = new Parse();
			client = new Discord.Client();
			embedLogin = new Discord.MessageEmbed();
			embedHourlyNews = new Discord.MessageEmbed();
			embed = new Discord.MessageEmbed();
const newsUrls = {
	PH: {
	abs: 'https://news.abs-cbn.com/nation/feed',
	gma: 'https://data.gmanetwork.com/gno/rss/videos/show/24oras/feed.xml',
	inq: 'https://www.inquirer.net/fullfeed/'
		},
	WORLD: {
	bbc: 'http://feeds.bbci.co.uk/news/world/rss.xml',
	nyt: 'https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/section/world/rss.xml',
	cnn: 'http://rss.cnn.com/rss/edition_world.rss'
	},
	TECH: {
	itsfoss: 'https://itsfoss.com/feed/'
	}
};
let chosenProvider;

newswords = ['1', '2', '3', '4']
const filter = response => { 
	return response.content.match(/[0-9]/gm)
}

dotenv.config();

//tutorial when bot is ready...
client.once('ready', () => {
	console.log("It is online");
	var channels = client.channels.cache.filter(ch => ch.type === 'text'); 
	embedLogin.setAuthor('Discord Bot | News & Quotes', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	embedLogin.setTitle(`Thanks for Inviting me!`)
	embedLogin.addFields({
		name: 'Commands', value: `!quote - get a random quote\n!news - get the latest news\n!changenews - change news provider`
	})
	channels.first().send(embedLogin);
})

//class constructor for rss news stuff some rss dont show desc and links...
class GetNews {
	constructor(url){
		this.url = url;
	}
	abs(nw){
		embed.setTitle(nw.items[0].title)
		embed.setDescription(nw.items[0].contentSnippet);
		embed.setThumbnail(nw.items[0].enclosure.url);
		embed.setURL(nw.items[0].link);
	}
	gma(nw){
		embed.setTitle(nw.items[0].title)
		embed.setURL(nw.items[0].link);
	}
	inq(nw){
		embed.setTitle(nw.items[0].title)
		embed.setURL(nw.items[0].link)
		embed.setDescription(nw.items[0].contentSnippet)
	}
	bbc(nw){
		embed.setTitle(nw.items[0].title)
		embed.setDescription(nw.items[0].contentSnippet);
		embed.setURL(nw.items[0].link);
	}
	nyt(nw){
		embed.setTitle(nw.items[0].title)
		embed.setDescription(nw.items[0].contentSnippet);
		embed.setURL(nw.items[0].link);
	}
	cnn(nw){
		embed.setTitle(nw.items[0].title)
		embed.setURL(nw.items[0].link)
		embed.setDescription(nw.items[0].contentSnippet)
	}
	itsfoss(nw){
		embed.setTitle(nw.items[0].title)
		embed.setURL(nw.items[0].link)
		embed.setDescription(nw.items[0].content)
	}
	theverge(nw){

	}
	async getNews(){
		const news = await feed.parseURL(this.url)
	switch (this.url) {
		case newsUrls.PH.abs:
			this.abs(news) 
			break;
		case newsUrls.PH.gma:
			this.gma(news)
			break;
		case newsUrls.PH.inq:
			console.log(news)
			this.inq(news)
			break;
		case newsUrls.WORLD.bbc:
			this.bbc(news)
			break;
		case newsUrls.WORLD.nyt:
			this.nyt(news)
			break;
		case newsUrls.WORLD.cnn:
			this.cnn(news)
			break;
		case newsUrls.TECH.itsfoss:
			this.itsfoss(news)
			break;
		case newsUrls.TECH.verge:
			console.log(news.items[0])
			//this.theverge(news)
			break;
		case newsUrls.TECH.//last one do this part tom eotjsjeptsetgsjegkjsfjfljlskejfljs
	}
 }
}

//Ph News
const ph = async message => {
	await message.channel.send(` \`\`\n Philippine news providers \`\` \n1.) Abs-Cbn \n2.) GMA-Network \n3.) Inquirer.net`)
	let fil = await message.channel.awaitMessages(filter, { time: 4000, max: 1})
	try {
	if (fil.first().content == '1'){
	let now = new GetNews(newsUrls.PH.abs);
		await now.getNews()
		await message.channel.send(embed); embed = new Discord.MessageEmbed()
	} 
	else if (fil.first().content == '2') {
		let now = new GetNews(newsUrls.PH.gma);
		await now.getNews();
		await message.channel.send(embed); embed = new Discord.MessageEmbed()
	}
	else if (fil.first().content == '3') {
		let now = new GetNews(newsUrls.PH.inq);
		await now.getNews();
		await message.channel.send(embed); embed = new Discord.MessageEmbed();
	}
	else{
		message.channel.send("Terminated Please try again! input a number...");
		}
	} catch(err){
		message.channel.send("Timeout Please try again!");
	}
}
//world news
const world = async message => {
	await message.channel.send(` \`\`\n World news provider \`\` \n1.) BBC \n2.) New York Times \n3.) CNN`)
	let fil = await message.channel.awaitMessages(filter, { time: 4000, max: 1})
	try {
	if (fil.first().content == '1'){
		let now = new GetNews(newsUrls.WORLD.bbc);
		await now.getNews()
		await message.channel.send(embed); embed = new Discord.MessageEmbed()
	} 
	else if (fil.first().content == '2') {
		let now = new GetNews(newsUrls.WORLD.nyt);
		await now.getNews();
		await message.channel.send(embed); embed = new Discord.MessageEmbed()
	}
	else if (fil.first().content == '3') {
		let now = new GetNews(newsUrls.WORLD.cnn);
		await now.getNews();
		await message.channel.send(embed); embed = new Discord.MessageEmbed()
	}
	else{
		message.channel.send("Terminated Please try again! input a number...");
		}
	} catch(err){
		console.error(err)
		message.channel.send("Timeout Please try again!");
	}
}

const tech = async message => {
	await message.channel.send(` \`\`\n Tech news provider \`\` \n1.) ItsFOSS`)
	let fil = await message.channel.awaitMessages(filter, { time: 4000, max: 1})
	try {
		if (fil.first().content == '1') {
			let now = new GetNews(newsUrls.TECH.itsfoss)
			await now.getNews();
			await message.channel.send(embed); embed = new Discord.MessageEmbed()
		}
		else{
			message.channel.send("Terminated Please try again! input a number...")
		}
		
	} catch (err) {
		console.error(err)
		 message.channel.send("Timeout Please try again!")
	}

}

//news every 2 hours
const hourlyNews = async message => {
	const time = new Date();
	if (time.getHours() / 2 == 0 && time.getTime() == 0 ){
		const news = await feed.parseURL(chosenProvider=newsUrls.PH.abs)
		let test = new GetNews();
		let send = x => { x(news); message.channel.send(embed); embed = new Discord.MessageEmbed()}
		if (chosenProvider == newsUrls.PH.abs || chosenProvider == undefined ) send(test.abs)
		if (chosenProvider == newsUrls.PH.gma) send(test.gma)
		if (chosenProvider == newsUrls.PH.inq) send(test.inq)
		if (chosenProvider == newsUrls.WORLD.bbc) send(test.bbc)
		if (chosenProvider == newsUrls.WORLD.nyt) send(test.nyt)
		if (chosenProvider == newsUrls.WORLD.cnn) send(test.cnn)
		if (chosenProvider == newsUrls.TECH.itsfoss) send(test.itsfoss)
		}
}

const get = async message => {
	if (message.content == '!quote') {
		const quotes = await fetch('https://api.quotable.io/random')
		const resp = await quotes.json();
		message.channel.send(`\`\`\` ${resp.content} \n  - ${resp.author} \`\`\``);
	}	else if (message.content == '!news') {
		try {
			await message.channel.send(`\`\`\n Choose your preferred news provider \`\` \n1.) Philippines \n2.) World \n3.) Tech`)
			let ans = await message.channel.awaitMessages(filter, { time: 4000, max: 1 })
			 if (ans.first().content == '1') {
					ph(message);
			} else if (ans.first().content == '2') {
					world(message);
			} else if (ans.first().content == '3'){
					tech(message);
			} else {
				message.channel.send("Terminated Invalid Response!")
			}
		} catch (e) {
			message.channel.send("Error! Try again (timeout)");
		}
} else if (message.content == '!changenews') {
	try {
		await message.channel.send(`
 \`\`\` Choose your default news provider every 2 hours \`\`\`
1.) Abs-Cbn  		 2.) GMA-Network  		3.) Inquirer
4.) BBC 		 		 5.) New York Times  	6.) CNN
7.) ItsFOSS 
		`)
	console.log(chosenProvider)
	let ans = await message.channel.awaitMessages(filter, { time: 4000,  max: 1})
	switch (ans.first().content) {
		case '1':
			chosenProvider = newsUrls.PH.abs
			message.channel.send(`Changed to ${newsUrls.PH.abs}`);
			break;
		case '2':
			chosenProvider = newsUrls.PH.gma
			message.channel.send(`Changed to ${newsUrls.PH.gma}`);
			break;
		case '3':
			chosenProvider = newsUrls.PH.inq
			message.channel.send(`Changed to ${newsUrls.PH.inq}`);
			break;
		case '4':
			chosenProvider = newsUrls.WORLD.bbc
			message.channel.send(`Changed to ${newsUrls.WORLD.bbc}`);
			break;
		case '5':
			chosenProvider = newsUrls.WORLD.nyt
			message.channel.send(`Changed to ${newsUrls.WORLD.nyt}`);
			break;
		case '6':
			chosenProvider = newsUrls.WORLD.cnn
			message.channel.send(`Changed to ${newsUrls.WORLD.cnn}`);
			break;
		case '7':
			chosenProvider = newsUrls.TECH.itsfoss
			message.channel.send(`Changed to ${newsUrls.TECH.itsfoss}`)
			break;
		}

	} catch (err) {
		console.error(err)
		message.channel.send("Timeout Please try again!")
		}
	}
}

client.on('message', get);
//client.once('message', dailyQuotes); set for later 
client.once('message', hourlyNews);


client.login(process.env.TOKEN);
/*
  message.channel.send("``" + "\n Choose your preferred news provider for every 2 hours " + "``" + "\n 1.) Abs-Cbn \n 2.) GMA")
		.then(() => {
			message.channel.awaitMessages(filter, { time: 7000, max: 1 })
				.then( awaited => {
					if (awaited.first().content == '1'){
						chosenProvider = newsUrls.abs;
						message.channel.send(`Default changed to ${newsUrls.abs}`)
					} else if (awaited.first().content == '2'){
						chosenProvider = newsUrls.gma;
						message.channel.send(`Default changed to ${newsUrls.gma}`)
					} else {
						message.channel.send("Terminated! Invalid Response try again!");
					}
				})
*/
