module.exports = {

resolvePermissions: function(perms) {

if (perms.includes('ADMINISTRATOR')) return ['All perms']

const newPerms = {
CREATE_INSTANT_INVITE: 'Create instant invite',
  ADD_REACTIONS: 'Add reactions',
  PRIORITY_SPEAKER: 'Speaker',
  STREAM: 'Stream',
  VIEW_CHANNEL: 'View this channel',
  SEND_MESSAGES: 'Send messages to this channel',
  SEND_TTS_MESSAGES: 'TTS messages',
  EMBED_LINKS: 'Embed links',
  ATTACH_FILES: 'Attachment files',
  READ_MESSAGE_HISTORY: 'Read this message history channel',
  USE_EXTERNAL_EMOJIS: 'Use external emojis',
  CONNECT: 'Connect channel',
  USE_VAD: 'Use vad',
  CHANGE_NICKNAME: 'Change my nickname',
MANAGE_EMOJIS: 'Manage emojis',
MANAGE_CHANNELS: 'Manage channels',
KICK_MEMBERS: 'Kick members',
BAN_MEMBERS: 'Ban members',
MANAGE_NICKNAMES: 'Manage nicknames',
MANAGE_ROLES: 'Manage roles',
MANAGE_WEBHOOKS: 'Manage webhooks',
USE_EXTERNAL_EMOJIS: 'Use external emojis',
MANAGE_MESSAGES: 'Manage messages',
MUTE_MEMBERS: 'Mute members',
CHANGE_NICKNAMES: 'Change nicknames',
MENTION_EVERYONE: 'Mention everyone',
VIEW_AUDIT_LOG: 'View audit logs'

}

return perms.map(x => newPerms[x]);

}

}