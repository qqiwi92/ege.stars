function toHsla(hsl: string, alpha = 0.5): string {
  return hsl.replace(/^hsl\((.+)\)$/, `hsla($1 / ${alpha})`);
}
export default toHsla;