export const runtime = 'edge';

import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get("user") || "reis";
  const amount = searchParams.get("amount") || "10";

  const contractAddress = process.env.CONTRACT_ADDRESS;
  const calldata = `0x12345678`; // TODO: gerçek encode

  const payload = {
    chainId: "eip155:84532",
    method: "eth_sendTransaction",
    params: {
      abi: [],
      to: contractAddress,
      data: calldata,
      value: "0"
    }
  };

  return new Response(JSON.stringify(payload), {
    headers: { "Content-Type": "application/json" },
  });
};
