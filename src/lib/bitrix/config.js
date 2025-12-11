// Bitrix24 Configuration
// TODO: Replace with actual IDs from your Bitrix24 instance

export const BITRIX_CONFIG = {
  // Category ID (Funnel ID) for deals
  // Shopify → Bitrix deals are created in category 2
  CATEGORY_ID: 2,

  // Stage IDs for category 2 (Stock site)
  STAGES: {
    PAID: 'C2:WON',
    PENDING: 'C2:PREPARATION',
    REFUNDED: 'C2:LOSE',
    CANCELLED: 'C2:LOSE',
    DEFAULT: 'C2:NEW'
  },

  // Source IDs mapping
  SOURCES: {
    SHOPIFY_DRAFT_ORDER: '', // TODO: Set source ID for shopify_draft_order
    SHOPIFY: '' // TODO: Set source ID for shopify
  },

  // Product ID for shipping
  SHIPPING_PRODUCT_ID: 0, // TODO: Set product ID for shipping if needed

  // SKU to Product ID mapping
  // TODO: Replace with actual product IDs from Bitrix24
  SKU_TO_PRODUCT_ID: {
    'ALB0002': 0, // TODO: Replace with actual product ID
    'ALB0005': 0, // TODO: Replace with actual product ID
    // Add more SKU mappings as needed
  }
};

// Financial status to stage ID mapping
export const financialStatusToStageId = (financialStatus) => {
  const status = financialStatus?.toLowerCase() || '';
  const mapping = {
    'paid': BITRIX_CONFIG.STAGES.PAID,
    'pending': BITRIX_CONFIG.STAGES.PENDING,
    'refunded': BITRIX_CONFIG.STAGES.REFUNDED,
    'cancelled': BITRIX_CONFIG.STAGES.CANCELLED,
    'partially_paid': BITRIX_CONFIG.STAGES.PENDING,
    'partially_refunded': BITRIX_CONFIG.STAGES.REFUNDED,
    'voided': BITRIX_CONFIG.STAGES.CANCELLED
  };
  return mapping[status] || BITRIX_CONFIG.STAGES.DEFAULT;
};

// Source name to source ID mapping
export const sourceNameToSourceId = (sourceName) => {
  const source = sourceName?.toLowerCase() || '';
  const mapping = {
    'shopify_draft_order': BITRIX_CONFIG.SOURCES.SHOPIFY_DRAFT_ORDER,
    'shopify': BITRIX_CONFIG.SOURCES.SHOPIFY,
    'web': BITRIX_CONFIG.SOURCES.SHOPIFY,
    'pos': BITRIX_CONFIG.SOURCES.SHOPIFY
  };
  return mapping[source] || null;
};


