import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Textarea } from "@/components/ui/Textarea";

const packageJsonTemplate = `{
  "name": "discord-bot-basic",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "discord.js": "^14.16.3",
    "dotenv": "^16.4.5"
  }
}`;

const envTemplate = `DISCORD_BOT_TOKEN=replace_with_your_token`;

const indexTemplate = `import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once("ready", () => {
  console.log(\`Logged in as \${client.user.tag}\`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === "!ping") {
    await message.reply("Pong!");
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);`;

const readmeTemplate = `# Discord Bot Basic Template

## Setup
1. Create a folder and add:
   - package.json
   - .env
   - index.js
2. Run:
   npm install
   npm start
3. In Discord Developer Portal:
   - Create application + bot
   - Enable Message Content Intent
   - Invite bot to your server

Command:
- !ping -> Pong!`;

export const DiscordBotTemplateBasicPage = () => {
  return (
    <ToolLayout
      seo={{
        title: "Discord Bot Template Basic | Altcore Tools Studio",
        description: "Copy-paste a minimal Discord bot starter template.",
        canonicalPath: "/tools/discord-bot-template-basic"
      }}
      title="Discord Bot Template Basic"
      description="Template ultra basique pour démarrer un bot Discord en quelques minutes."
      category="discord"
      toolSlug="discord-bot-template-basic"
      helpText="Template éducatif: ajoute validation, logs et protections avant production."
    >
      <Card className="space-y-2">
        <p className="text-sm text-muted">`package.json`</p>
        <Textarea readOnly className="min-h-48 font-mono text-xs" value={packageJsonTemplate} />
        <CopyButton value={packageJsonTemplate} label="Copy package.json" />
      </Card>

      <Card className="space-y-2">
        <p className="text-sm text-muted">`.env`</p>
        <Textarea readOnly className="min-h-20 font-mono text-xs" value={envTemplate} />
        <CopyButton value={envTemplate} label="Copy .env" />
      </Card>

      <Card className="space-y-2">
        <p className="text-sm text-muted">`index.js`</p>
        <Textarea readOnly className="min-h-72 font-mono text-xs" value={indexTemplate} />
        <CopyButton value={indexTemplate} label="Copy index.js" />
      </Card>

      <Card className="space-y-2">
        <p className="text-sm text-muted">`README.md` quickstart</p>
        <Textarea readOnly className="min-h-52 font-mono text-xs" value={readmeTemplate} />
        <CopyButton value={readmeTemplate} label="Copy README" />
      </Card>
    </ToolLayout>
  );
};
