export async function saveUrl(body) {
  console.log('body :>> ', body);
  const result = await fetch(CUBOX_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...body, type: 'url', folder: 'Telegram 收藏' }),
  });
  console.log('result :>> ', result);
}

export async function saveMemo(body) {
  const result = await fetch(CUBOX_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...body, type: 'memo' }),
  });
  console.log('result :>> ', JSON.stringify(result));
}
