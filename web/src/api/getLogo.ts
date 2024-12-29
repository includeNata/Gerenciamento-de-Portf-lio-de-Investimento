import { api } from "@/lib/utils";

interface GetLogoProps {
  name: string;
}

export async function getLogo({ name }: GetLogoProps) {
  const response = await api.get(`https://api.brandfetch.io/v2/search/${name}`, {
    headers: {
      Authorization: `Bearer yJ7n47OFAEKalTWecQg10CupE1G0jNOupwkNXoQBbHM=`,
    },
  });

  return response.data;
}
