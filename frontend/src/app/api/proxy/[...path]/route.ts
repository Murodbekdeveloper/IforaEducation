import { getAuthHeaders } from "@/lib/session";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4100/api";

async function forward(method: string, path: string[], request: Request) {
  const headers = await getAuthHeaders();
  if (!headers.Authorization) {
    return Response.json({ message: "Tizimga kiring." }, { status: 401 });
  }

  const init: RequestInit = { method, headers: { ...headers } };
  if (method === "POST" || method === "PATCH") {
    init.headers = { ...init.headers, "Content-Type": "application/json" };
    init.body = await request.text();
  }

  const res = await fetch(`${API_URL}/${path.join("/")}`, init);
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  return Response.json(data, { status: res.status });
}

type RouteParams = { params: Promise<{ path: string[] }> };

export async function GET(request: Request, { params }: RouteParams) {
  const { path } = await params;
  return forward("GET", path, request);
}

export async function POST(request: Request, { params }: RouteParams) {
  const { path } = await params;
  return forward("POST", path, request);
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { path } = await params;
  return forward("PATCH", path, request);
}

export async function DELETE(request: Request, { params }: RouteParams) {
  const { path } = await params;
  return forward("DELETE", path, request);
}
