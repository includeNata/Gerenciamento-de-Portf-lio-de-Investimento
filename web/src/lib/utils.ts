import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"

export const api = axios.create()

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

api.interceptors.request.use(async (config) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return config
})
