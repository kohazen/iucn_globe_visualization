// IUCN API proxy — deploy this to Cloudflare Workers
// Set IUCN_API_KEY in Worker environment variables (Settings → Variables)

const IUCN_BASE = 'https://api.iucnredlist.org/api/v4';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }

    // Only handle /api/iucn/* paths
    if (!url.pathname.startsWith('/api/iucn/')) {
      return new Response('Not found', { status: 404 });
    }

    const apiPath = url.pathname.replace('/api/iucn/', '/');
    const target = `${IUCN_BASE}${apiPath}${url.search}`;

    // Use key from env var; client can override via X-IUCN-Key header
    const apiKey = request.headers.get('X-IUCN-Key') || env.IUCN_API_KEY || '';

    const upstream = await fetch(target, {
      headers: {
        'Accept': 'application/json',
        'Authorization': apiKey ? `Bearer ${apiKey}` : '',
        'User-Agent': 'IUCN-Globe-App/1.0',
      },
    });

    const body = await upstream.arrayBuffer();

    return new Response(body, {
      status: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('Content-Type') || 'application/json',
        ...corsHeaders(),
      },
    });
  },
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'X-IUCN-Key, Authorization',
  };
}
