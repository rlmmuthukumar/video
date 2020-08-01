import React , { Component } from 'react';
import Poster from './Poster';
import {Link} from 'react-router';
import { Grid, Row, Col} from 'react-bootstrap';

export default class MovieList extends Component{

  render() {
  const style={
	display: 'flex',
	flexWrap: 'wrap'
  }
    console.log("props details",this.state)
    let movies = this.props.movies.filter(function(movie) {


      return movie.Poster !== null ;
    }).map(function(movie) {
       //console.log("moviiiiiieeeee",movie.Poster)
        return(
          
          <Col xs={6} sm={4} md={3} key={movie.imdbID} >
            <Link to={'/movie/'+movie.imdbID} ><Poster info id={movie.id} path={movie.Poster} title={movie.Title}  release_date={movie.Year} responsive /></Link>
          </Col>
        );
    });

    return(
      <Grid fluid={false}>
        <Row style={style}>
          {movies}
        </Row>
      </Grid>
    );
  }
}
