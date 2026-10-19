import { getAuthHeaders } from "@/lib/session";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4100/api";

export async function POST(request: Request) {
  const body = await request.json();
  const headers = await getAuthHeaders();

  if (!headers.Authorization) {
    return Response.json(
      { message: "Buyurtma berish uchun avval tizimga kiring." },
      { status: 401 },
    );
  }

  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return Response.json(data, { status: res.status });
}
