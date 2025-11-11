import type { NextApiRequest, NextApiResponse } from 'next';
import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit/frame";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const body: FrameRequest = req.body; // pages/api otomatik olarak body parse eder (json)
  const { isValid, message } = await getFrameMessage(body);

  if (!isValid) {
    return res.status(400).send("Invalid");
  }

  const username = (message.input || "reis").toLowerCase();
  const amount = 10;
  const pricePer = 0.01 + (0 * 0.0005);
  const total = amount * pricePer;

  const html = `<!DOCTYPE html>...`; // aynı HTML

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  return res.status(200).send(html);
}
