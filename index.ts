// https://bun.sh/
import change_html_texts from "./change_html_texts";
const host = "www.dow.com"

Bun.serve({
  port: 36107,
  fetch: async (request) => {
    const requestUrl = new URL(request.url)
    
    const url = `https://${host}${requestUrl.pathname}${requestUrl.search}`
    const res = await fetch(url);
    
    let rawResponse = await res.text()
    
    res.headers.delete('Content-Encoding')

    return new Response(
      res.headers.get('content-type')?.includes( 'text/html') ? change_html_texts(rawResponse) : rawResponse, 
      {
      headers: {
        ...res.headers.toJSON()
      }
    });
  },
});

console.log("Run on http://localhost:36107");
