export const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";
export const apiOptions = {
  method: "GET",
  headers: {
    "Access-Control-Allow-Origin": "*",
    accept: "application/json",
    "x-cg-demo-api-key": apiKey,
    mode: "no-cors",
  },
};
