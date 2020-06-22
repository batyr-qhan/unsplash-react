import React, { Component } from "react";
import "./App.css";

import Home from "./components/Home";

import favoriteIcon from "./images/favorite_24px_rounded.svg";
import downloadIcon from "./images/download_24px_rounded.svg";
import maximizeIcon from "./images/maximize-2.svg";
import logo from "./images/logo.png";
import history from "./images/history_24px.png";
import searchIcon from "./images/search_24px.png";
import group1 from "./images/Group 11.png";
import group2 from "./images/Group 10.png";
import line from "./images/Line.png";

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

  componentDidMount() {
    this.getCollections();
    this.getRandomPhotos();
  }

  addFavorites(arg) {
    // console.log(arg);
    // this.state.favorites.forEach((favItem) => {
    //   if (favItem.id === arg.id) {
    //     console.log("item exists");
    //   } else
    // });
    this.setState({ favorites: [...this.state.favorites, arg] });
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
                    {" "}
                    <img src={favoriteIcon} alt="favorite" />
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
                <div className="searchBar">
                  <h1>Поиск</h1>
                  <img className="fadeLine" src={line} alt="line" />

                  <ul className="collectionList">
                    {this.state.collections.map((collection) => {
                      return (
                        <li
                          key={collection.id}
                          onClick={() => {
                            this.setState({
                              collectionId: collection.id,
                              history: [...this.state.history, collection],
                            });
                            unsplash.collections
                              .getCollectionPhotos(
                                collection.id,
                                1,
                                9,
                                "popular"
                              )
                              .then(toJson)
                              .then((json) => {
                                // Your code
                                console.log(json);
                                this.setState({
                                  photos: json,
                                });
                              });
                          }}
                        >
                          <Link to="/">{collection.title}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            } else if (subMenu === "hide") {
              return (
                <div className="favoriteBar">
                  <h1>Избранное</h1>

                  <ul className="favoriteList">
                    <li>
                      <img src={group1} alt="" />
                    </li>
                    <li>
                      <img src={group2} alt="" />
                    </li>
                  </ul>
                </div>
              );
            } else if (subMenu === "history") {
              return (
                <div className="searchBar">
                  <h1>History</h1>
                  <img className="fadeLine" src={line} alt="line" />
                  <ul className="collectionList">
                    {this.state.history.map((item) => {
                      return (
                        <li
                          key={item.id}
                          onClick={() => {
                            this.setState({
                              collectionId: item.id,
                            });
                          }}
                          onClick={() => {
                            unsplash.collections
                              .getCollectionPhotos(item.id, 1, 9, "popular")
                              .then(toJson)
                              .then((json) => {
                                // Your code
                                console.log(json);
                                this.setState({
                                  photos: json,
                                });
                              });
                          }}
                        >
                          <Link to="/">{item.title}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            }
          })()}

          <Switch>
            <Route path="/favorite">
              <Favorite favorites={this.state.favorites} />
            </Route>
            <Route path="/">
              <Home
                photos={this.state.photos}
                collectionId={this.state.collectionId}
                addFavorites={this.addFavorites}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function Favorite(props) {
  return (
    <ul className="photoList">
      {props.favorites.map((item) => {
        return (
          <li key={item.id} className="photoContainer">
            <img src={item.urls.small} alt="" className="image" />
            <div className="overlay">
              <img
                src={item.user.profile_image.medium}
                alt="avatar"
                className="avatar"
              />
              <p className="userFullname">
                {item.user.first_name} {item.user.last_name}
              </p>
              <p className="username">@{item.user.username}</p>
              <div className="iconsContainer">
                <img src={favoriteIcon} alt="favorite" />{" "}
                <img src={maximizeIcon} alt="maximize" />{" "}
                <img src={downloadIcon} alt="download" />{" "}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default App;
