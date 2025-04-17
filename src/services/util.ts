export const fetchData = async (url: string, method = "GET", data = undefined) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const res = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(data),
  });

  const rs = await res.json();
  if (rs.code) {
    throw new Error(rs.message);
  }

  return rs;
};