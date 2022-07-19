import logo from "./logo.svg";
import "./App.css";

import styled from "styled-components";
import {
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
} from "react-instantsearch-dom";
import { searchClient } from "./typesenseAdapter";
import MoviesHits from "./components/moviesHits";
import "instantsearch.css/themes/satellite.css";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 0;
  background-color: #fef5e5;
`;

// beige color: ''rgb(210, 210, 229) 
function App() {
  return (
    <AppContainer>
      <h2>EasyRead</h2>
      <InstantSearch indexName="books" searchClient={searchClient}>
        <h4>Найди любимые книги по низким ценам</h4>
        <SearchBox />
        {/* <RefinementList attribute="genres" /> */}
        {/* <div className="book-box"> */}
          <MoviesHits />
          {/* </div> */}
        
        <Pagination />
      </InstantSearch>
    </AppContainer>
  );
}

export default App;
