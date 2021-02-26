const fetch = require('node-fetch');
const states = require('./stateAbbreviations.json');
const stateNames = require('./stateNames.json');

module.exports = {
	name: 'covid',
    description: 'Returns statistics on cases of coronavirus. Arguments: "US" or "global", defaults to global.',
    aliases: [],
    guildOnly: false,
    cooldown: 1,
	async execute(message, args) {
        /*
        if(args[0] == "US") {
            //fetch from US api
        }
        else if (args[0] == "CA") { 
            //fetch from CA api
        }
        else if (args[0] == "global") {
            //global
        }
        else {
            //fetch from http://coronavirusapi.com/getTimeSeries/${state}
        }
        */

        // Note: http://coronavirusapi.com/getTimeSeries/ API stopped working, now this command only supports US/Global 

        function commas(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }

        function capitalize(word) {
            return word[0].toUpperCase() + word.slice(1).toLowerCase();
        }

        if(args.length < 1) return message.channel.send("Please provide an argument.");

        if(args[0] == "US") {
            try {
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
                            name: "Active:",
                            value: commas(recent.Active),
                            inline: false,
                        },
                        {
                            name: "Deaths:",
                            value: commas(recent.Deaths),
                            inline: false,
                        },
                        {
                            name: "Recovered:",
                            value: commas(recent.Recovered),
                            inline: false,
                        },
                    ],
                };
                message.channel.send({ embed: covidEmbed });
            } catch (e) {
                message.channel.send('Could not obtain data :confused:');
                return console.error(e);
            }
        }
        /*else if (args[0] == "CA") {
            try {
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
                            name: "Confirmed:",
                            value: commas(recent.positive),
                            inline: false,
                        },
                        {
                            name: "Deaths:",
                            value: commas(recent.deaths),
                            inline: false,
                        },
                        {
                            name: "Tested:",
                            value: commas(recent.tested),
                            inline: false,
                        },
                        {
                            name: "Percent Tested Positive",
                            value: (recent.positive/recent.tested * 100).toFixed(3) + "%",
                            inline: false,
                        },
                    ],
                };
                message.channel.send({ embed: covidEmbed });
            } catch (e) {
                message.channel.send('Could not obtain data :confused:');
                return console.error(e);
            }
        } */
        else /*if (args[0] == "global")*/ {
            try {
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
                        },                        {
                            name: "Deaths:",
                            value: commas(json.TotalDeaths),
                            inline: false,
                        },
                        {
                            name: "Recovered:",
                            value: commas(json.TotalRecovered),
                            inline: false,
                        },
                    ],
                };
                message.channel.send({ embed: covidEmbed });
            } catch (e) {
                message.channel.send('Could not obtain data :confused:');
                return console.error(e);
            }
        }
        /*
        else {
            try {
                let state = args[0];
                state = capitalize(state);

                if(state in stateNames) {
                    state = stateNames[state];
                }

                if(!(state in states)) {
                    return message.channel.send("That is an invalid state name/abbreviation.");
                }

                const res = await fetch(`http://coronavirusapi.com/getTimeSeriesJson/${state}`);
                const json = await res.json();
    
                let length = json.length;
                let recent = json[length - 1];
    
                const covidEmbed = {
                    color: 0x92C6DD,
                    author: {
                        name: `${states[state]}: COVID-19 Cases`,
                    },
                    fields: [
                        {
                            name: "Confirmed:",
                            value: commas(recent.positive),
                            inline: false,
                        },
                        {
                            name: "Deaths:",
                            value: commas(recent.deaths),
                            inline: false,
                        },
                        {
                            name: "Tested:",
                            value: commas(recent.tested),
                            inline: false,
                        },
                        {
                            name: "Percent Tested Positive",
                            value: (recent.positive/recent.tested * 100).toFixed(3) + "%",
                            inline: false,
                        },
                    ],
                };
                message.channel.send({ embed: covidEmbed });
            } catch (e) {
                message.channel.send('Could not obtain data.');
                return console.error(e);
            }
        } */
	},
};