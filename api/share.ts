import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { type, id } = req.query;

  if (!type || !id) {
    return res.status(400).json({ error: "Missing 'type' or 'id' parameter" });
  }

  // Construct the deep link
  const deepLink = `shareai://app?type=${encodeURIComponent(type as string)}&id=${encodeURIComponent(id as string)}`;

  res.redirect(deepLink);
}
