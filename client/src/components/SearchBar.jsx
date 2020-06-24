import React from "react";

import line from "../images/Line.png";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Unsplash from "unsplash-js";
const { toJson } = require("unsplash-js");
const unsplash = new Unsplash({
  accessKey: "QqpHhb7OaoMiq91Yz3_TPX6G7_y11KgjrT4rG6tkqfQ",
});

export default function SearchBar(props) {
  return (
    <div className="searchBar">
      <h1>Поиск</h1>
      <img className="fadeLine" src={line} alt="line" />

      <ul className="collectionList">
        {props.collections.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => {
                props.searchTa(item);
                unsplash.collections
                  .getCollectionPhotos(item.id, 1, 9, "popular")
                  .then(toJson)
                  .then((json) => {
                    // console.log(json);
                    props.setPhotos(json);
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
