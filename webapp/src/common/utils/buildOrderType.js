export default prefs => {
  const { delivery, carryout, outing } = prefs.toJS();

  if (outing && (delivery || carryout)) {
    return 'any';
  } else if (outing && !(delivery || carryout)) {
    return 'outing';
  }
  return 'delivery or carryout';
};
