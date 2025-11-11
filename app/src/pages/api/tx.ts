import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const user = (req.query.user as string) || "reis";
  const amount = (req.query.amount as string) || "10";

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

  res.setHeader("Content-Type", "application/json");
  return res.status(200).json(payload);
}
