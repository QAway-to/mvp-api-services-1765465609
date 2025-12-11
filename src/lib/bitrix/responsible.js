import mapping from './responsibleMapping.json' assert { type: 'json' };

/**
 * Resolve Bitrix responsible (ASSIGNED_BY_ID) based on Shopify order.
 * Priority: byWeekday -> byTag -> byCountryCode -> bySource -> default.
 * Logs warning if matched by default.
 */
export function resolveResponsibleId(order) {
  const {
    default: defaultId = null,
    byWeekday = {},
    byTag = {},
    byCountryCode = {},
    bySource = {},
  } = mapping;

  // 1) By weekday (0=Sunday ... 6=Saturday)
  const weekday = new Date().getDay();
  if (byWeekday && Object.prototype.hasOwnProperty.call(byWeekday, weekday)) {
    return byWeekday[weekday];
  }

  // 2) By tag
  const tags = (order.tags || '')
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);
  for (const tag of tags) {
    if (byTag[tag]) {
      return byTag[tag];
    }
  }

  // 3) By country code (shipping or billing)
  const countryCode =
    order.shipping_address?.country_code ||
    order.billing_address?.country_code ||
    null;
  if (countryCode && byCountryCode[countryCode]) {
    return byCountryCode[countryCode];
  }

  // 4) By source
  const source = order.source_name || '';
  if (source && bySource[source]) {
    return bySource[source];
  }

  // 5) Default
  if (defaultId) {
    console.warn(`Responsible matched by default for order ${order.id}`);
    return defaultId;
  }

  console.warn(`Responsible not resolved for order ${order.id}`);
  return null;
}

