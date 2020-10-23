import React from 'react'
import PropTypes from 'prop-types'
import './photoList.scss'

// Icons
import { ReactComponent as FavoriteIcon } from '../../images/favoriteIcon.svg'
import downloadIcon from '../../images/download_24px_rounded.svg'
import maximizeIcon from '../../images/maximize-2.svg'
import { addToFavorites, removeFromFavorites } from '../../actions/photoActions'
// Components
import Home from '../Home/Home'

const PhotoList = ({ photos, favorites, dispatch }) => {
  return (
    <div className='photos'>
        <ul className="photos__list">
          {photos.map((item) => {
            return (
              <li key={item.id} className="photos__photo photo">
                <img src={item.urls.small} alt="" className="photo__image"/>
                <div className="photo__overlay">
                  <img
                    src={item.user.profile_image.medium}
                    alt="avatar"
                    className="photo__avatar"
                  />
                  <p className="photo__fullname">
                    {item.user.first_name} {item.user.last_name}
                  </p>
                  <p className="photo__username">@{item.user.username}</p>
                  <div className="photo__icons">
                    <div>
                      {(() =>
                          (
                            favorites.some(
                              (el) => el.id === item.id
                            )
                          ) ? (
                              <FavoriteIcon style={{ fill: 'red' }} onClick={() => {
                                dispatch(removeFromFavorites(item))
                              }}/>
                            ) :
                            <FavoriteIcon style={{ fill: 'white' }} onClick={() => {
                              console.log('sdfsdfsdfsdf')
                              dispatch(addToFavorites(item))
                            }}/>

                      )()}


                      {/*<FavoriteIcon style={{ fill: 'white' }} onClick={() => {*/}
                      {/*  console.log('sdfsdfsdfsdf')*/}
                      {/*  dispatch(addToFavorites(item))*/}
                      {/*}}/>*/}
                    </div>

                    <div>
                      <a href={`photo/${item.id}`}>
                        <img src={maximizeIcon} alt="maximize"/>
                      </a>
                    </div>
                    <div>
                      <img src={downloadIcon} alt="download"/>{' '}
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
    </div>
  )
}

PhotoList.propTypes = {
  photos: PropTypes.array,
  favorites: PropTypes.array,
  dispatch: PropTypes.func
}

export default PhotoList