import {
  REPLY_RECEIVED,
  // REQUEST_SENT,
  // FAILURE_RECEIVED,
} from '_store/utils/promiseMiddleware';

import indexBy from '_store/utils/indexBy';

export default (state = {}, action) => {
  if (action && action.stage && action.stage !== REPLY_RECEIVED) return state;
  switch (action.type) {
    default:
      return state;
  }
};
