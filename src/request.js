export async function saveUrl(body) {
  return fetch(CUBOX_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...body, type: 'url', folder: 'Telegram 收藏' }),
  });
}

export async function saveMemo(body) {
  return fetch(CUBOX_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...body, type: 'memo' }),
  });
}

export async function extractTitle(url){
  const result = await fetch(url);
  const html = await result.text();
  const title = html.match(/<title>(.*)<\/title>/)[1];
  return title;
}