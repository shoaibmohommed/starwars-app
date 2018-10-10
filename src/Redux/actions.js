const Type = {
    SET_PLANETS_LIST: 'SET_PLANETS_LIST',
    SET_USERNAME: 'SET_USERNAME'
}

export function setPlanetList(planetsData) {
    return {
        type: Type.SET_PLANETS_LIST,
        planetsData: planetsData
    }
}

export function setUsername(username) {
    return {
        type: Type.SET_USERNAME,
        username: username
    }
}