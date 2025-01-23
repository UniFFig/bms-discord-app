import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from 'discord-interactions';
import { timestampToUTCEastCoast } from './utils.js';
import smite_table from './database/models/smite_table.js';

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */

export default function interactionHandler(app){
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
    // Interaction type and data
    const { type, data } = req.body;
  
    /**
     * Handle verification requests
     */
    if (type === InteractionType.PING) {
      return res.send({ type: InteractionResponseType.PONG });
    }
  
    /**
     * Handle slash command requests
     * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
     */
    if (type === InteractionType.APPLICATION_COMMAND) {
      const { name } = data;
  
      //MARK: "missed_smite" command
      if (name === 'missed_smite') {


        const new_entry = await smite_table.create({}).catch((err)=>{
            console.error(err)
        })

        let last_id = new_entry?.id - 1
        let last_entry = ''

        if(last_id === 0){
            last_entry = '**FIRST RECORDED SMITE MISS**'
        }else{
            last_entry = await smite_table.findOne({id: last_id}).catch((err)=>{
                console.error(err)
            })
        }

        // Send a message into the channel where command was triggered from
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            // Fetches a random emoji to send from a helper function
            content: 
`
Brendan missed smite at ${last_id === 0 ? last_entry : timestampToUTCEastCoast(last_entry?.createdAt)}
Total: **${new_entry.id}**,
`,
          },
        });
      }
  
      console.error(`unknown command: ${name}`);
      return res.status(400).json({ error: 'unknown command' });
    }
  
    console.error('unknown interaction type', type);
    return res.status(400).json({ error: 'unknown interaction type' });
  });
}