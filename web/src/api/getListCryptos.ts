import { api } from "@/lib/utils";

export async function getListCrypto() {
  const response = await api.get(`http://localhost:8080/coins`, {
    withCredentials: false,
  });

  return response.data;
}
