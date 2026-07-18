export default {
  async fetch(request, env) {
    if (!env?.ASSETS?.fetch) return new Response('Dario Germanà site assets are unavailable.', { status: 503 });
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404 || !request.headers.get('accept')?.includes('text/html')) return response;
    const fallback = new URL(request.url);
    fallback.pathname = '/index.html';
    return env.ASSETS.fetch(new Request(fallback, request));
  },
};
