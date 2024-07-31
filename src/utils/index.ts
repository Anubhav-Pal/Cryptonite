export const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";
export const apiOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": apiKey,
    mode: "no-cors",
  },
};
