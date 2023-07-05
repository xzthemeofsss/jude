const { Telegraf } = require('telegraf');
const { Application, Router } = require('@cfworker/web');
const createTelegrafMiddleware = require('cfworker-middleware-telegraf');
const { saveMemo, saveUrl,extractTitle } = require('./request');

const bot = new Telegraf(BOT_TOKEN);

async function handleEntity(entity, caption, ctx) {
  if (entity.type === 'text_link') {
    const title = caption;
    const { url } = entity;
    await saveUrl({ content: url, title });
    ctx.telegram.sendMessage(ctx.message.chat.id, '链接保存成功啦');
  }
  if (entity.type === 'url') {
    const url = caption.substring(entity.offset, entity.offset + entity.length);
    const title = await extractTitle(url);
    const response = await saveUrl({ content: url, title });
    if(response.status === 200){
      ctx.telegram.sendMessage(ctx.message.chat.id, '链接保存成功啦');
    }else{
      console.log('ctx.message :>> ', ctx.message);
      ctx.telegram.sendMessage(ctx.message.chat.id, '链接保存失败');
    }
  }
}

bot.on('message', async ctx => {
  const { text, caption_entities, caption, entities } = ctx.message;
  if (caption_entities) {
    await Promise.all(
      caption_entities.map(async entity => handleEntity(entity, caption, ctx))
    );
  } else if (entities) {
    await Promise.all(
      entities.map(async entity => handleEntity(entity, text, ctx)));
  } else if (text) {
    const response = await saveMemo({ content: text });
    if(response.status===200){
      ctx.telegram.sendMessage(ctx.message.chat.id, '速记保存成功啦');
    }else{
      console.log('ctx.message :>> ', ctx.message);
      ctx.telegram.sendMessage(ctx.message.chat.id, '速记保存失败');
    }
  }
});

const router = new Router();
router.post(`/${SECRET_PATH}`, createTelegrafMiddleware(bot));
new Application().use(router.middleware).listen();