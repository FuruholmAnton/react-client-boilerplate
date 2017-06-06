import vent from './eventEmitter.js';

export const onRouteChange = function(previousRoute, nextRoute) {
  console.log('Route changed');
  // TODO: Check how to send params
  vent.emit('route:changed', nextRoute);
};
