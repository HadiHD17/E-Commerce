/**
 * Utility function to join a list of CSS classes into one string
 */
export default function cls(...classes) {
    // `filter(Boolean)` filters out falsy values,
    return classes.filter(Boolean).join(" ");
}
