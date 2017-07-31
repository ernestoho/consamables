export default (types, prefix) => types.reduce((allTypes, type) => ({
  ...allTypes,
  [type]: prefix ? `${prefix}/${type}` : type,
}), {});
