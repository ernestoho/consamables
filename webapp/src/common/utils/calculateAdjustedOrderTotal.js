export default (total, tax, overhead) => (
  Math.ceil(total * (tax + 1) * (overhead + 1) * 2) * 0.5
).toFixed(2);
