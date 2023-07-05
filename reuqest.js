const CUBOX_API = self.CUBOX_API;

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
  await fetch(CUBOX_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...body, type: 'memo' }),
  });
}
