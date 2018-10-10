const baseState = { planetsData: {}, username: '' }

export default (state = baseState, action) => {
    switch (action.type) {
        case "SET_PLANETS_LIST": {
            state = Object.assign({}, state, {
                planetsData: action.planetsData
            });
        }
            return state;
        case "SET_USERNAME": {
            state = Object.assign({}, state, {
                username: action.username
            });
        }
            return state;
        default: return state;
    }
}