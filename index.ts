// https://bun.sh/
import change_html_texts from "./change_html_texts";
const host = "www.dow.com"

Bun.serve({
  port: 36107,
  fetch: async (request) => {
    const url = new URL(request.url)
    const res = await fetch(`https://${host}${url.pathname}`);
    
    let rawResponse = await res.text()

    return new Response(
      res.headers.get('content-type')?.includes( 'text/html') ? change_html_texts(rawResponse) : rawResponse, 
      {
      headers: {
        'content-type': res.headers.get('content-type') ?? 'text/html'
      }
    });
  },
});

console.log("Run on http://localhost:36107");
