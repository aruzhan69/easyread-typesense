import React from "react";
import { Highlight } from "react-instantsearch-dom";
import styled from "styled-components";
import MovieHighlight from "../movieHighlight";
import "./index.css";

const HitContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // max-width: 300px;
  width:18%;
  // height: 30%;
  margin: 2em 2em;
  background-color: white;
  // border:black solid 1px ;
  // border-radius: 10px;
  box-shadow: 0 1rem 2rem rgba(0,0,0,0.2);
`;

// const HitContainer:hover = styled.div`
//   box-shadow: 0 0 11px rgba(33,33,33,.2); 
// `;

const MoviePoster = styled.img`
  // width: 100px;
  // height: auto;
  width: 70%;
  height: 40%;
  margin: 2em 1em;
`;

const Title = styled.div`
  font-weight: black;
  font-size: 24px;
  margin-top: 10px;
  text-align: center;
`;

const Overview = styled.div`
  /* max-height: 9px; */
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: 0.5em;
  line-height: 1.3;
  font-size: 14px;
`;

const Overview2 = styled.div`
  /* max-height: 9px; */
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: 0.5em;
  line-height: 1.3;
  font-size: 18px;
`;

const Rating = styled.b`
  font-size: 16px;
  color: rgb(3, 3, 95);
  margin-top: 1rem;
`;

const Genre = styled.div`
  font-size: 14px;
  color: #236adb;
  margin-top: 10px;
`;

const HitsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export function MovieHit(props) {
  const { hit } = props;

  return (
    <HitContainer>
      <div>
        <image className="book-poster" src={hit.image} alt={hit.title}/>
      </div>
      <MoviePoster src={hit.image} alt={hit.title} />
      <Title>
        <MovieHighlight hit={hit} attribute="title" />
      </Title>
      <Overview2>
        <MovieHighlight hit={hit} attribute="storeName" />
      </Overview2>
      <Overview>
        <MovieHighlight hit={hit} attribute="info" />
      </Overview>
      <Overview>
        <a href={hit.link}>Visit website</a>
      </Overview>
      <Rating>
        <h4>{hit.price} тг</h4>
      </Rating>
    </HitContainer>
  );
}
