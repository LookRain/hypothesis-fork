/**
 * Type conversion methods that coerce incoming configuration values to an
 * expected type or format that other parts of the UI may make assumptions
 * on. This is needed for incoming configuration values that are otherwise
 * not sanitized.
 *
 * Note that if the values passed are plain javascript values (such as ones
 * produced from JSON.parse), then these methods do not throw errors.
 */

/**
 * Returns a boolean
 *
 * @param {any} value - initial value
 * @return {boolean}
 */
export function toBoolean(value) {
  if (typeof value === 'string') {
    if (value.trim().toLocaleLowerCase() === 'false') {
      // "false", "False", " false", "FALSE" all return false
      return false;
    }
  }
  const numericalVal = Number(value);
  if (!isNaN(numericalVal)) {
    return Boolean(numericalVal);
  }
  // Any non numerical or falsely string should return true, otherwise return false
  return typeof value === 'string';
}

/**
 * Returns either an integer or NaN
 *
 * @param {any} value - initial value
 * @return {number}
 */
export function toInteger(value) {
  // Acts as a simple wrapper
  return parseInt(value);
}

/**
 * Returns either the value if its an object or an empty object
 *
 * @param {any} value - initial value
 * @return {object}
 */
export function toObject(value) {
  if (typeof value === 'object' && value !== null) {
    return value;
  }
  // Don't attempt to fix the values, just ensure type correctness
  return {};
}

/**
 * Returns the value as a string or an empty string if the
 * value undefined, null or otherwise falsely.
 *
 * @param {any} value - initial value
 * @return {string}
 */
export function toString(value) {
  if (value && typeof value.toString === 'function') {
    return value.toString();
  }
  return '';
}

/**
 * @template T
 * @typedef {import('preact').Ref<T>} Ref
 */

/**
 * Helper for downcasting a ref to a more specific type, where that is safe
 * to do.
 *
 * This is mainly useful to cast a generic `Ref<HTMLElement>` to a more specific
 * element type (eg. `Ref<HTMLDivElement>`) for use with the `ref` prop of a JSX element.
 * Since Preact only writes to the `ref` prop, such a cast is safe.
 *
 * @template T
 * @template {T} U
 * @param {Ref<T>|undefined} ref
 * @return {Ref<U>|undefined}
 */
export function downcastRef(ref) {
  return /** @type {Ref<U>|undefined} */ (ref);
}
