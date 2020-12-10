const fetch = require('node-fetch');

module.exports = {
	name: 'covid',
    description: 'Returns statistics on cases of coronavirus. Default is global, but you can provide "US" or "CA" as an argument. Ex: %covid US',
    aliases: [],
    guildOnly: false,
    cooldown: 1,
	async execute(message, args) {
        if(args[0] == "US") {
            //fetch from US api
        }
        else if (args[0] == "CA") { 
            //fetch from CA api
        }
        else {
            //fetch from global api
        }
        
        if(args[0] == "US") {
            try {
                function commas(x) {
                    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                }
    
                const res = await fetch('https://api.covid19api.com/total/country/united-states');
                const json = await res.json();
    
                let length = json.length;
                let recent = json[length - 1];
    
                const covidEmbed = {
                    color: 0x92C6DD,
                    author: {
                        name: `United States: COVID-19 Cases`,
                    },
                    fields: [
                        {
                            name: "Confirmed:",
                            value: commas(recent.Confirmed),
                            inline: false,
                        },
                        {
                            name: "Recovered:",
                            value: commas(recent.Recovered),
                            inline: false,
                        },
                        {
                            name: "Active:",
                            value: commas(recent.Active),
                            inline: false,
                        },
                        {
                            name: "Deaths:",
                            value: commas(recent.Deaths),
                            inline: false,
                        }
                    ],
                    };
        
                message.channel.send({ embed: covidEmbed });
     
                } catch (e) {
                message.channel.send('Could not obtain data :confused:');
                return console.error(e);
                }
        }
        else if (args[0] == "CA") {
            try {
                function commas(x) {
                    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                }
    
                const res = await fetch('http://coronavirusapi.com/getTimeSeriesJson/CA');
                const json = await res.json();
    
                let length = json.length;
                let recent = json[length - 1];
    
                const covidEmbed = {
                    color: 0x92C6DD,
                    author: {
                        name: `California: COVID-19 Cases`,
                    },
                    fields: [
                        {
                            name: "Tested:",
                            value: commas(recent.tested),
                            inline: false,
                        },
                        {
                            name: "Confirmed:",
                            value: commas(recent.positive),
                            inline: false,
                        },
                        {
                            name: "Percent Tested Positive",
                            value: (recent.positive/recent.tested * 100).toFixed(3) + "%",
                            inline: false,
                        },
                        {
                            name: "Deaths:",
                            value: commas(recent.deaths),
                            inline: false,
                        }
                    ],
                    };
        
                message.channel.send({ embed: covidEmbed });
     
                } catch (e) {
                message.channel.send('Could not obtain data :confused:');
                return console.error(e);
                }
        }
        else {
            try {
                function commas(x) {
                    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                }
    
                const res = await fetch('https://api.covid19api.com/world/total');
                const json = await res.json();
    
                const covidEmbed = {
                    color: 0x92C6DD,
                    author: {
                        name: `Global: COVID-19 Cases`,
                    },
                    fields: [
                        {
                            name: "Confirmed:",
                            value: commas(json.TotalConfirmed),
                            inline: false,
                        },
                        {
                            name: "Recovered:",
                            value: commas(json.TotalRecovered),
                            inline: false,
                        },
                        {
                            name: "Deaths:",
                            value: commas(json.TotalDeaths),
                            inline: false,
                        }
                    ],
                    };
        
                message.channel.send({ embed: covidEmbed });
     
                } catch (e) {
                message.channel.send('Could not obtain data :confused:');
                return console.error(e);
                }
        }
	},
};