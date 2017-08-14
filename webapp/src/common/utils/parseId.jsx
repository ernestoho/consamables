import React from 'react';

export default WrappedComponent => {
  const withIntId = props => (
  // eslint-disable-next-line
    <WrappedComponent {...props} id={parseInt(props.id || props.params.id, 10)} />
  );

  withIntId.displayName = `ParsedId(${WrappedComponent.displayName || WrappedComponent.name})`;
  return withIntId;
};
