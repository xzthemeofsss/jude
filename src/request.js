export async function saveUrl(body) {
  await fetch(CUBOX_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...body, type: 'url', folder: 'Telegram 收藏' }),
  });
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
