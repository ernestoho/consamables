export default builder => {
  let totalToppings;
  if (builder.get('size') === 'whole') {
    totalToppings = builder
      .get('toppings')
      .reduce((total, side) => total + (side === 'whole' ? 1 : 0.5), 0);
  } else {
    totalToppings = builder.get('toppings').size;
  }

  const hasExtraCheese = builder.get('cheese') === 'Extra Cheese';
  const hasDiffSauce = builder.get('sauce') !== builder.get('defaultSauce') && builder.get('sauce') !== 'No Sauce';

  return (totalToppings + (hasDiffSauce ? 1 : 0) + (hasExtraCheese ? 1 : 0)) > builder.get('maxToppings');
};

export const formatOrderItemData = data => {
  if (data.has('pizza')) {
    const size = data.getIn(['pizza', 'size']);
    return `${size.charAt(0).toUpperCase()}${size.slice(1)} ` +
         `with ${data.getIn(['pizza', 'toppings']).size} toppings`;
  }
  return null;
};
