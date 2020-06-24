import React, { Component } from "react";
import "./App.css";

import Home from "./components/Home";
import Favorite from "./components/Favorite";
import PhotoPage from "./components/PhotoPage";
import SearchBar from "./components/SearchBar";
import FavoriteBar from "./components/FavoriteBar";
import HistoryBar from "./components/HistoryBar";

import { ReactComponent as FavoriteIcon } from "./images/favoriteIcon.svg";
import logo from "./images/logo.png";
import history from "./images/history_24px.png";
import searchIcon from "./images/search_24px.png";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Unsplash from "unsplash-js";
const { toJson } = require("unsplash-js");

const unsplash = new Unsplash({
  accessKey: "QqpHhb7OaoMiq91Yz3_TPX6G7_y11KgjrT4rG6tkqfQ",
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subMenu: "search",
      collections: [],
      photos: [],
      collectionId: undefined,
      favorites: [],
      history: [],
    };

    this.showHistory = this.showHistory.bind(this);
    this.showSearch = this.showSearch.bind(this);
    this.hidePanel = this.hidePanel.bind(this);
    this.addFavorites = this.addFavorites.bind(this);
    this.removeFavorites = this.removeFavorites.bind(this);
    this.searchTag = this.searchTag.bind(this);
    this.setPhotos = this.setPhotos.bind(this);
    this.setCollId = this.setCollId.bind(this);
  }

  showHistory() {
    this.setState({ subMenu: "history" });
  }

  showSearch() {
    this.setState({ subMenu: "search" });
  }

  hidePanel() {
    this.setState({ subMenu: "hide" });
  }

  searchTag(item) {
    this.setState({
      collectionId: item.id,
      history: [...this.state.history, item],
    });
  }

  setPhotos(arg) {
    this.setState({
      photos: arg,
    });
  }

  setCollId(arg) {
    this.setState({
      collectionId: arg.id,
    });
  }

  getCollections() {
    unsplash.collections
      .listCollections(1, 8, "popular")
      .then(toJson)
      .then((json) => {
        // console.log(json);
        this.setState({
          collections: json,
        });
      });
  }

  getRandomPhotos() {
    unsplash.photos
      .listPhotos(2, 15, "latest")
      .then(toJson)
      .then((json) => {
        this.setState({
          photos: json,
        });
      });
  }

  addFavorites(arg) {
    this.setState({ favorites: [...this.state.favorites, arg] });
  }

  removeFavorites(arg) {
    let filteredArray = this.state.favorites.filter(
      (item) => item.id !== arg.id
    );
    this.setState({ favorites: filteredArray });
  }

  componentDidMount() {
    this.getCollections();
    this.getRandomPhotos();
  }

  render() {
    let { subMenu } = this.state;

    return (
      <Router>
        <div className="App">
          <header id="header">
            <Link to="/" onClick={this.showSearch}>
              <img className="logo" src={logo} alt="logo" />
            </Link>
            <nav className="navLinks">
              <ul className="navList">
                <li onClick={this.showSearch}>
                  <img src={searchIcon} alt="search" />
                  <p>Search</p>
                </li>
                <li>
                  <Link to="/favorite" onClick={this.hidePanel}>
                    <FavoriteIcon fill="white" />
                  </Link>
                  <Link to="/favorite" onClick={this.hidePanel}>
                    <p>Favorite</p>
                  </Link>
                </li>
                <li onClick={this.showHistory}>
                  <img src={history} alt="history" /> <p>History</p>{" "}
                </li>
              </ul>
            </nav>
          </header>

          {(() => {
            if (subMenu === "search") {
              return (
                <SearchBar
                  collections={this.state.collections}
                  searchTag={this.searchTag}
                  setPhotos={this.setPhotos}
                />
              );
            } else if (subMenu === "hide") {
              return <FavoriteBar />;
            } else if (subMenu === "history") {
              return (
                <HistoryBar
                  history={this.state.history}
                  setPhotos={this.setPhotos}
                  setCollId={this.setCollId}
                />
              );
            }
          })()}

          <Switch>
            <Route path="/photo/:id">
              <PhotoPage
                photos={this.state.photos}
                photo={this.state.singlePhoto}
                setPhoto={this.assignPhoto}
              />
            </Route>
            <Route path="/favorite">
              <Favorite favorites={this.state.favorites} />
            </Route>

            <Route exact path="/">
              <Home
                photos={this.state.photos}
                collectionId={this.state.collectionId}
                addFavorites={this.addFavorites}
                removeFavorites={this.removeFavorites}
                favoritesArray={this.state.favorites}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
