/* More concise version of the HOC described in the redux docs:
 * http://redux.js.org/docs/recipes/UsingImmutableJS.html#use-a-higher-order-component-to-convert-your-smart-components-immutablejs-props-to-your-dumb-components-javascript-props
 * This is used to wrap dumb components that expect vanilla JS props but are passed props of Immutable types.
 * Doing the conversion in this step has considerable performance benefits over doing it in mapStateToProps.
 */

import React from 'react';
import { Iterable } from 'immutable';
import _ from 'lodash';

export default function toJS(WrappedComponent) {
  const withJSProps = maybeJSProps => {
    // TODO: If/when we update to Immutable v4, change this to use isImmutable (Iterable is deprecated)
    const jsProps = _.mapValues(maybeJSProps, val => (Iterable.isIterable(val) ? val.toJS() : val));

    return <WrappedComponent {...jsProps} />;
  };

  withJSProps.displayName = `toJS(${WrappedComponent.displayName || WrappedComponent.name})`;
  return withJSProps;
}
