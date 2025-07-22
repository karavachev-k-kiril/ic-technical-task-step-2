/**
 * @typedef {object} Address
 * @property {string} locality
 * @property {string} localitySlug
 */

/**
 * @typedef {object} Reviews
 * @property {number} count
 * @property {number} score
 */

/**
 * @typedef {object} Workshop
 * @property {string} hashedKhCode
 * @property {string} name
 * @property {string} slug
 * @property {string | null} image
 * @property {Address | null} address
 * @property {string | null} phoneNumber
 * @property {Reviews | null} reviews
 * @property {string} [countryCode]
 */

/**
 * @typedef {object} Brand
 * @property {string} id
 * @property {string} name
 * @property {number} count
 */

/**
 * @typedef {object} PaginationInfo
 * @property {number} page
 * @property {number} perPage
 * @property {number} totalPages
 * @property {number} total
 */

/**
 * @typedef {object} APIResponse
 * @property {Workshop[]} results
 * @property {{ brands: Brand[] }} filters
 * @property {PaginationInfo} pagination
 */

export {};
