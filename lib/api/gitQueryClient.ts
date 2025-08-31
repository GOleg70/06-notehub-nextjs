// lib/getQueryClient.ts
import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

// ✅ Використовуємо cache, щоб Next.js не створював новий QueryClient при кожному виклику
const getQueryClient = cache(() => new QueryClient());

export default getQueryClient;
