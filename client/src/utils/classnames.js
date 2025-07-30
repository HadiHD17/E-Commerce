export default function cls(...classes) {
    // `filter(Boolean)` filters out falsy values,
    return classes.filter(Boolean).join(" ");
}
