import { api } from "@/lib/utils";

export async function listMarket() {
  const response = await api.get("https://brapi.dev/api/quote/list?token=vDBStM8rWAtAm9qtMguAMj");

  return response.data;
}
