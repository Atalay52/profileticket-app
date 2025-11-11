// contents of file
export const runtime = 'edge';

import { NextRequest } from "next/server";
import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit/frame";

export const POST = async (req: NextRequest) => {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body);

  if (!isValid) {
    return new Response("Invalid", { status: 400 });
  }

  const username = (message.input || "reis").toLowerCase();
  const amount = 10;
  const pricePer = 0.01 + (0 * 0.0005); // TODO: gerçek supply'den çek
  const total = amount * pricePer;

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://via.placeholder.com/800x400/6366f1/ffffff?text=@${username}+Ticket" />
    <meta property="fc:frame:input:text" content="Profil adı gir (@reis)" />
    <meta property="fc:frame:button:1" content="10 Ticket Al (${total.toFixed(3)} USDC)" />
    <meta property="fc:frame:button:1:action" content="tx" />
    <meta property="fc:frame:button:1:target" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/tx?user=${username}&amount=${amount}" />
    <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame" />
  </head>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
};
