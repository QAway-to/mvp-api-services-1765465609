/**
 * Shopify Admin API client
 * Uses Admin API access token (private/custom app) to call Shopify Admin endpoints.
 *
 * Required env vars:
 *  - SHOPIFY_ADMIN_API_TOKEN
 *  - SHOPIFY_STORE_DOMAIN (e.g. myshop.myshopify.com)
 * Optional:
 *  - SHOPIFY_API_VERSION (default: 2024-10)
 */

const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN;
const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-10';

function assertAdminConfig() {
  if (!ADMIN_TOKEN) {
    throw new Error('SHOPIFY_ADMIN_API_TOKEN is not set');
  }
  if (!STORE_DOMAIN) {
    throw new Error('SHOPIFY_STORE_DOMAIN is not set');
  }
}

/**
 * Call Shopify Admin REST API
 * @param {string} path - e.g. '/orders.json'
 * @param {Object} options - { method, body, headers }
 */
export async function callShopifyAdmin(path, options = {}) {
  assertAdminConfig();
  const url = `https://${STORE_DOMAIN}/admin/api/${API_VERSION}${path}`;
  const { method = 'GET', body, headers = {} } = options;

  const resp = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_TOKEN,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    throw new Error(`Shopify Admin API error ${resp.status}: ${JSON.stringify(json)}`);
  }
  return json;
}


