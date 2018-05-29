/**
 * ACTION TYPES
 */
const GET_PLAYER = 'GET_PLAYER';

/**
 * INITIAL STATE
 */
const defaultState = {
};

/**
 * ACTION CREATORS
 */
export const getPlayer = (player) => ({ type: GET_PLAYER, player});

/**
 * REDUCER
 */
export default (state = defaultState, action) => {
	switch (action.type) {
		case GET_PLAYER:
			return action.player
		default:
			return state;
	}
};
