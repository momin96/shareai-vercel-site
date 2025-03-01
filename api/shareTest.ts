import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { type, id, subid } = req.query;

  if (!type || !id || !subid) {
    return res.status(400).json({ error: "Missing 'type', 'id', or 'subid' parameter" });
  }

  // Construct the deep link
  const deepLink = `shareai://app?type=${encodeURIComponent(type as string)}&id=${encodeURIComponent(id as string)}&subid=${encodeURIComponent(subid as string)}`;
  
  // HTML Response with a Button
  const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Open ShareAI App</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            button { font-size: 18px; padding: 10px 20px; cursor: pointer; background-color: #007AFF; color: white; border: none; border-radius: 5px; }
            button:hover { background-color: #005ecb; }
        </style>
        <script>
            function openApp() {
                window.location.href = "${deepLink}";
                setTimeout(() => {
                    window.location.href = "https://yourfallbackwebsite.com"; // Redirect to fallback if the app is not installed
                }, 2000);
            }
        </script>
    </head>
    <body>
        <h2>Open App</h2>
        <p>Click the below to open the app.</p>
        <button onclick="openApp()">Open App</button>
    </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(htmlResponse);
}
