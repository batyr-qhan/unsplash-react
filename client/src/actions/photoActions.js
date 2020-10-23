export const addPhotos = (photos) => {
  return {
    type: 'ADD_PHOTOS',
    photos
  }
}

export const addCollections = (collections) => {
  return {
    type: 'ADD_COLLECTIONS',
    collections
  }
}

export const addToFavorites = (photo) => {
  return {
    type: 'ADD_TO_FAVORITES',
    photo
  }
}

export const removeFromFavorites = (photo) => {
  return {
    type: 'REMOVE_FROM_FAVORITES',
    photo
  }
}