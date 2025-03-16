export function parseNumber(value, defaultValue) {
  if (typeof value === 'undefined') {
    return defaultValue;
  }
  const parseNumber = parseInt(value);

  if (Number.isNaN(parseNumber)) {
    return defaultValue;
  }
  return parseNumber;
}

export function parsePaginationParams(query) {
  const { page, perPage } = query;

  const parsePage = parseNumber(page, 1);
  const parsePerPage = parseNumber(perPage, 10);

  return { page: parsePage, perPage: parsePerPage };
}
