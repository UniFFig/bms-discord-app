import 'dotenv/config';

// may move this if we make more commands later
import { InstallGlobalCommands } from './utils.js';

// Append and fetch from missed smite table
const MISSED_SMITE_COMMAND = {
  name: 'missed_smite',
  description: 'Fetches data from missed smites table',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// may move this if we make more commands later
const ALL_COMMANDS = [MISSED_SMITE_COMMAND];
InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
