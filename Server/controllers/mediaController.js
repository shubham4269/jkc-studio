import https from "https";

// Proxy a Google Drive image by file ID and stream it back to the client
export async function proxyDriveImage(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send("Missing file id");

    // Use thumbnail endpoint - more reliable
    const driveUrl = `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w800`;

    https.get(driveUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (upstream) => {
      // Handle redirects (Google often redirects)
      if (upstream.statusCode >= 300 && upstream.statusCode < 400 && upstream.headers.location) {
        https.get(upstream.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (finalRes) => {
          res.setHeader("Content-Type", finalRes.headers["content-type"] || "image/jpeg");
          res.setHeader("Cache-Control", "public, max-age=86400");
          finalRes.pipe(res);
        }).on("error", (err) => {
          console.error("Redirect fetch error:", err);
          res.status(502).send("Failed to fetch image");
        });
        return;
      }

      if (upstream.statusCode !== 200) {
        return res.status(502).send("Failed to fetch image");
      }

      res.setHeader("Content-Type", upstream.headers["content-type"] || "image/jpeg");
      res.setHeader("Cache-Control", "public, max-age=86400");
      upstream.pipe(res);
    }).on("error", (err) => {
      console.error("media proxy error", err);
      res.status(500).send("Server error");
    });
  } catch (err) {
    console.error("media proxy error", err);
    res.status(500).send("Server error");
  }
}
