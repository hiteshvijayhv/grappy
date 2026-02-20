const API_ORIGIN = "https://gosharee.herokuapp.com";

module.exports = async (req, res) => {
  const rawPath = req.query.path;
  const path = Array.isArray(rawPath) ? rawPath.join("/") : rawPath || "";
  const targetUrl = `${API_ORIGIN}/${path}`;

  const headers = { ...req.headers };
  delete headers.host;
  delete headers.connection;
  delete headers["content-length"];

  const method = req.method || "GET";
  const hasBody = method !== "GET" && method !== "HEAD";
  const body = hasBody
    ? typeof req.body === "string"
      ? req.body
      : Object.keys(req.body || {}).length
      ? JSON.stringify(req.body)
      : undefined
    : undefined;

  if (body && !headers["content-type"]) {
    headers["content-type"] = "application/json";
  }

  try {
    const response = await fetch(targetUrl, {
      method,
      headers,
      body,
    });

    res.status(response.status);

    response.headers.forEach((value, key) => {
      if (["content-encoding", "content-length", "transfer-encoding", "connection"].includes(key)) {
        return;
      }
      res.setHeader(key, value);
    });

    const data = await response.text();
    res.send(data);
  } catch (error) {
    res.status(502).json({
      message: "API proxy request failed",
      detail: error.message,
    });
  }
};
