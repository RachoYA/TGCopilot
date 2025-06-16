import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import input from 'input';

export async function initTelegram(): Promise<TelegramClient | null> {
  const apiId = Number(process.env.API_ID);
  const apiHash = process.env.API_HASH;
  if (!apiId || !apiHash) {
    console.log('Telegram API_ID and API_HASH are required');
    return null;
  }
  const sessionStr = process.env.TG_SESSION || '';
  const stringSession = new StringSession(sessionStr);
  const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });
  if (!sessionStr) {
    await client.start({
      phoneNumber: async () => process.env.TG_PHONE ?? await input.text('phone: '),
      password: async () => process.env.TG_PASSWORD ?? await input.text('2FA password: '),
      phoneCode: async () => await input.text('Code: '),
      onError: (err) => console.log(err),
    });
    console.log('Save this session string in TG_SESSION:', client.session.save());
  } else {
    await client.connect();
  }
  return client;
}
