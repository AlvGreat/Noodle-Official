module.exports = {
  name: 'cipher',
  description: 'Encodes/Decodes a string using the caesar shift schema',
  aliases: ["caesar",],
  guildOnly: false,
  usage: '[req: shift] [req: en/de] [req: string]',
  cooldown: 1,
  execute(message, args) {
    const decodeKeyWords = ['decode', 'decrypt', 'undo', 'de', 'decipher'];
    const encodeKeyWords = ['encode', 'crypt', 'do', 'en', 'cipher'];
    if (isNaN(args[0])) {
      return message.channel.send(`Woah there buckaroo! You need to give me a shift value!`)
    }
    else {
      if (args[0] > 25 || args[0] < 0) {
        return message.channel.send(`Woah there buckaroo! You need to give me a number from 0 to 25!`)
      }
      else {
        const originalShift = parseInt(args.shift());
        const cipherType = args.shift();

        if (!cipherType) {
          return message.channel.send(`Woah there buckaroo! You need to tell me wheter to encode or decode`)
        }
        else {
          if (args.length === 0) {
            return message.channel.send(`Woah there buckaroo! You need to give me a string!`)
          }
          else {
            let str = args.join(" ");
            if (decodeKeyWords.indexOf(cipherType) > -1) {
              let shift = (26 - originalShift) % 26;
              const decoded = caesarShift(str, shift);
              message.channel.send(`Decoded: \`${str}\`, the result is the following: \n\`\`\`${decoded}\`\`\``);
            }
            else if (encodeKeyWords.indexOf(cipherType) > -1) {
              let shift = originalShift;
              const encoded = caesarShift(str, shift);
              message.channel.send(`Encoded: \`${str}\` with a shift of \`${shift}\`, the result is the following: \n\`\`\`${encoded}\`\`\``);
            }
            else {
              message.channel.send(`Woah there buckaroo! You need to tell me wheter to encode or decode`)
            }
          }
        }
      }
    }

    function caesarShift(str, shift) {
      let result = "";
      for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if (65 <= c && c <= 90) {
          result += String.fromCharCode((c - 65 + shift) % 26 + 65);  // Uppercase
        }
        else if (97 <= c && c <= 122) {
          result += String.fromCharCode((c - 97 + shift) % 26 + 97);  // Lowercase
        }
        else {
          result += str.charAt(i);  // Copy
        }
      }
      return result;
    }
  }
};

