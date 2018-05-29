/**
 * ACTION TYPES
 */
const GET_STATE = 'GET_STATE';

/**
 * INITIAL STATE
 */
const defaultState = {
};

/**
 * ACTION CREATORS
 */
export const getState = (state) => ({ type: GET_STATE, state});

/**
 * REDUCER
 */
export default (state = defaultState, action) => {
	switch (action.type) {
		case GET_STATE:
			return action.state
		default:
			return state;
	}
};
