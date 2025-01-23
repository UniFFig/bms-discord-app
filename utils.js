import 'dotenv/config';

export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
    },
    ...options
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}

// Simple method that returns a random quip from list
export function getRandomQuip() {
  const quipList = ['Looks like your jungler made an oopsie!', 'Brendan... Really...', "I'm just dissapointed...", 'JGL Diff.', 'Uh oh stinky!'];
  return quipList[Math.floor(Math.random() * quipList.length)];
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function timestampToUTCEastCoast(timestamp) {
  const date = new Date(timestamp);

  // Convert to UTC string
  const utcString = date.toUTCString();

  // Adjust for Eastern Time
  const estDate = new Date(date);
  const estString = estDate.toLocaleString('en-US', { timeZone: 'America/New_York' });

  return estString
}
