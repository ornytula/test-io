
export async function api(url, method = 'GET', data, token = null) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (data) config.body = JSON.stringify(data);
  if (token) config.headers.Authorization = 'Bearer ' + token;

  const res = await fetch(url, config);
  if (!res.ok) throw new Error('API error');
  return await res.json();
}
