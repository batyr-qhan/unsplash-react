const initialState = {
  photos: [],
  collections: [],
  favorites: []
}

function rootReducer (state = initialState, action) {
  switch (action.type) {
    case 'ADD_PHOTOS':
      return { ...state, photos: action.photos }
    case 'ADD_COLLECTIONS':
      return { ...state, collections: action.collections }
    case 'ADD_TO_FAVORITES':
      return { ...state, favorites: [...state.favorites, action.photo] }
    // case 'REMOVE_FROM_FAVORITES':
    //   return { ...state, collections: action.collections }
    default:
      return state
  }
}

export default rootReducer