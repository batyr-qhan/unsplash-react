import React, { Component, useEffect } from 'react'
import './App.scss'

// Components
import Home from '../Home/Home'
import Favorite from '../Favorite/Favorite'
import Search from '../Search/Search'
import History from '../History/History'
// import PhotoPage from '../PhotoPage/PhotoPage'

// Icons
import { ReactComponent as FavoriteIcon } from '../../images/favoriteIcon.svg'
import logo from '../../images/logo.png'
import history from '../../images/history_24px.png'
import searchIcon from '../../images/search_24px.png'

// Packages
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Unsplash, { toJson } from 'unsplash-js'
import { addPhotos } from '../../actions/photoActions'
// const { toJson } = require('unsplash-js')
import { useSelector, useDispatch } from 'react-redux'

const unsplash = new Unsplash({
  accessKey: 'QqpHhb7OaoMiq91Yz3_TPX6G7_y11KgjrT4rG6tkqfQ'
})

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    unsplash.photos
      .listPhotos(2, 15, 'latest')
      .then(toJson)
      .then((json) => {
        dispatch(addPhotos(json))
        // addPhotos(json)
        // setPhotos(json)

      })
  }, [dispatch])

  // addFavorites(arg)
  // {
  //   this.setState({ favorites: [...this.state.favorites, arg] })
  // }
  //
  // removeFavorites(arg)
  // {
  //   let filteredArray = this.state.favorites.filter(
  //     (item) => item.id !== arg.id
  //   )
  //   this.setState({ favorites: filteredArray })
  // }

  return (
    <Router>
      <div className='App'>
        <header className='header'>
          <div className='container'>
            <div className='header__inner'>
              <Link to='/'>
                <img className='header__logo' src={logo} alt='logo'/>
              </Link>
              <ul className='header__links'>
                <li>
                  <Link to='/search'>
                    <img src={searchIcon} alt='search'/>
                    <p>Search</p>
                  </Link>
                </li>
                <li>
                  <Link to='/favorite'>
                    <FavoriteIcon fill='white'/>
                    <p>Favorite</p>
                  </Link>
                </li>
                <li>
                  <Link to='/history'>
                    <img src={history} alt='history'/>
                    <p>History</p>{' '}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/*{(() => {*/}
        {/*  if (subMenu === 'search') {*/}
        {/*    return (*/}
        {/*      <SearchBar*/}
        {/*        collections={this.state.collections}*/}
        {/*        searchTag={this.searchTag}*/}
        {/*        setPhotos={this.setPhotos}*/}
        {/*      />*/}
        {/*    )*/}
        {/*  } else if (subMenu === 'hide') {*/}
        {/*    return <FavoriteBar />*/}
        {/*  } else if (subMenu === 'history') {*/}
        {/*    return (*/}
        {/*      <HistoryBar*/}
        {/*        history={this.state.history}*/}
        {/*        setPhotos={this.setPhotos}*/}
        {/*        setCollId={this.setCollId}*/}
        {/*      />*/}
        {/*    )*/}
        {/*  }*/}
        {/*})()}*/}

        <Switch>
          <Route path='/photo/:id'>
            {/*<PhotoPage/>*/}
          </Route>
          <Route path='/favorite'>
            <Favorite/>
          </Route>

          <Route path='/search'>
            <Search unsplash={unsplash}/>
          </Route>

          <Route path='/history'>
            <History unsplash={unsplash}/>
          </Route>

          <Route exact path='/'>
            <Home unsplash={unsplash}/>
          </Route>
        </Switch>
      </div>
    </Router>
  )

}

export default App
