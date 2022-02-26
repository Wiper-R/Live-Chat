const API_BASE = "http://127.0.0.1:5000/api/";

interface RequestParameters {
  method?: "GET" | "POST" | "PUT" | "HEAD" | "DELETE" | "PATCH" | "OPTIONS";
  params?: object;
  json?: object;
}

interface ApiErrorObject {
  message?: string;
  status?: number;
}

class ApiError extends Error {
  status?: number;
  constructor(msg?: string, status?: number) {
    super(msg);
    this.status = status;
  }
}

async function request(
  path: string,
  { method, params, json }: RequestParameters = {}
): Promise<object> {
  method = method ? method : "GET";
  var url = new URL(path, API_BASE);
  const headers: HeadersInit = new Headers();
  if (params && Object.keys(params).length !== 0) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, value);
    }
  }

  if (json) {
    headers.set("Content-Type", "application/json");
  }

  try {
    const res = await fetch(url.href, {
      method,
      headers,
      credentials: "include",
      ...(json ? { body: JSON.stringify(json) } : {}),
    });

    const data: object = await res.json();

    if (res.ok) {
      return data;
    } else {
      throw new ApiError((data as ApiErrorObject).message, res.status);
    }
  } catch (e) {
    const message = (e as Error).message;
    throw new ApiError(message);
  }
}

export default request;
export { ApiError };
