export class Http {
    static async getJson<T>(url: string): Promise<T> {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      return res.json() as Promise<T>;
    }

    static async postJson<TRequest, TResponse>(
      url: string,
      body: TRequest
    ): Promise<TResponse> {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      return res.json() as Promise<TResponse>;
    }

    static async delete(id: number, url: string): Promise<void> {
      const serviceUrl = `${url}${id}`;
      const res = await fetch(serviceUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
    
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error DELETE ${res.status}: ${text}`);
      }
    }
}