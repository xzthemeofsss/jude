export async function saveUrl(body) {
  const result = await fetch(CUBOX_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...body, type: 'url', folder: 'Telegram 收藏' }),
  });
  console.log('result :>> ',await result.text());
}

export async function saveMemo(body) {
  const result = await fetch(CUBOX_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...body, type: 'memo' }),
  });
  console.log('result :>> ', result.body);
}

export async function extractTitle(url){
  const result = await fetch(url);
  const html = await result.text();
  const title = html.match(/<title>(.*)<\/title>/)[1];
  return title;
}