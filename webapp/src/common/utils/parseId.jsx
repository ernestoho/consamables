import React from 'react';

export default WrappedComponent => {
  // eslint-disable-next-line
  const withIntId = ({ params: { id } }) => (
    <WrappedComponent id={parseInt(id, 10)} />
  );

  withIntId.displayName = `ParsedId(${WrappedComponent.displayName})`;
  return withIntId;
};
