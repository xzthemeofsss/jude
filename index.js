const { Telegraf } = require('telegraf');
const { Application, Router } = require('@cfworker/web');
const createTelegrafMiddleware = require('cfworker-middleware-telegraf');

const bot = new Telegraf(self.BOT_TOKEN);

bot.start();
bot.on('message', async ctx => {
  const { text, caption_entities, caption, entities } = ctx.message;
  if (caption_entities) {
    await Promise.all(
      caption_entities.map(async entity => {
        if (entity.type === 'text_link' || entity.type === 'url') {
          const title = caption;
          const { url } = entity;
          await saveUrl({ content: url, title });
          ctx.telegram.sendMessage(ctx.message.chat.id, '链接保存成功啦');
        }
      })
    );
  }

  if (entities) {
    await Promise.all(
      entities.map(async entity => {
        if (entity.type === 'text_link' || entity.type === 'url') {
          const title = msg.text;
          const { url } = entity;
          await saveUrl({ content: url, title });
          ctx.telegram.sendMessage(ctx.message.chat.id, '链接保存成功啦');
        }
      })
    );
  }

  if (text) {
    await saveMemo({ content: msg.text });
    ctx.telegram.sendMessage(ctx.message.chat.id, '速记保存成功啦');
  }
});

const router = new Router();
router.post(`/${self.SECRET_PATH}`, createTelegrafMiddleware(bot));
new Application().use(router.middleware).listen();
