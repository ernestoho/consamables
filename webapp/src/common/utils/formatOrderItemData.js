export default data => {
  if (data.has('pizza')) {
    const size = data.getIn(['pizza', 'size']);
    return `${size.charAt(0).toUpperCase()}${size.slice(1)} ` +
         `with ${data.getIn(['pizza', 'toppings']).size} toppings`;
  }
  return '';
};
