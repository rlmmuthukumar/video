import React, {Component} from 'react'
import { Navbar, Image } from 'react-bootstrap/lib'
import TMDBlogo from '../images/themoviedb_green.svg'
import logo from '../images/logo_square.svg'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {Button  } from 'react-bootstrap'
require('bootstrap/dist/css/bootstrap.css');
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import './search.css'
import { URL_SEARCH, API_KEY_ALT, URL_IMG, IMG_SIZE_XSMALL} from '../const';

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      yearselected:'',
      suggestions:[]
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      return this.handleSubmit(this.state.value);
    }
  }

  handleSubmit = (searchText) => {
    this.props.dispatch(push('/search/'+ searchText));
    this.setState({ value: ''});
  }


  getSuggestionValue = (suggestion) => {
    return suggestion.title;
  };

  onSuggestionsFetchRequested = ({ value }) => {
      const trimmedValue = value.trim();

      if (trimmedValue.length > 0) {
          let url = URL_SEARCH + trimmedValue + API_KEY_ALT;
            fetch(url)
              .then(response => response.json())
              .then(json => json.results)
              .then(data => {
                const results = data.map(movie => {
                  let temp = {}
                  temp.id = movie.id
                  temp.title = movie.title
                  temp.img = movie.poster_path
                  temp.year = (movie.release_date === "") ? "0000" : movie.release_date.substring(0,4)
                  return temp
                });
                this.setState({
                  suggestions: results
                });
              }).catch(error => console.log('Exception to get Suggestions'))
      }
      else {
        this.setState({
          suggestions: []
        })
      }
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  renderSuggestion = (suggestion) => {
    return (
      <div>
      <img alt="" className="searchResult-image" src= {suggestion.img == null ? logo: URL_IMG+IMG_SIZE_XSMALL+suggestion.img } />
        <div className="searchResult-text">
          <div className="searchResult-name">
            {suggestion.title}
          </div>
          {suggestion.year}
        </div>
      </div>
    );
  };

  onSuggestionSelected = (event, { suggestion, method }) => {
    if (method === 'enter')
      event.preventDefault();
    this.props.dispatch(push('/movie/'+ suggestion.id));
    this.setState({ value: ''});
  };

  onSelect = (value) => 
  {
     console.log("selected options",value);
     this.setState({yearselected:value});
  }
  render(){
    const options = [
    '2020', '2019','2018' ,'2017','2016','2015','2014','2013','2012','2011','2010','2009','2008','2007','2006','2005','2004','2003','2002','2001','2000'
    ];
     const defaultOption = options[null];  

  const brandStyle = {
    fontWeight: 'bold',
    textTransform: 'caplitalize',
    paddingLeft: 10,
    fontSize: '1.2em'
  };

  const imgStyle = {
    height: '200%',
    width: 'auto',
    paddingLeft: '10px',
    marginTop: '-8px',
    display: 'inline-block'
  };

  const {value, suggestions} = this.state;
  const inputProps = {
    value,
    onChange: this.onChange,
    onKeyPress: this.handleKeyDown,
    placeholder: 'Search Movies...'
  };

  

  return (
    <Navbar bsStyle='inverse'>
      <Navbar.Header>
        <Navbar.Brand>
          {/* <a href="#/"><span style={brandStyle}>{this.props.brand}</span><Image style={imgStyle} src={TMDBlogo}/></a> */}
        </Navbar.Brand>
      </Navbar.Header>
     
      {/* <Navbar.Form pullRight>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps} />
      </Navbar.Form> */}

  {/* <select name="cars" id="cars">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="opel">Opel</option>
    <option value="audi">Audi</option>
  </select> */}

  {/* <DropdownButton title="List of year">
      <MenuItem href="#books">2000</MenuItem>
      <MenuItem href="#podcasts">2001</MenuItem>
      <MenuItem href="#">2002</MenuItem>
      <MenuItem href="#">2003</MenuItem>
      <MenuItem href="#addBlog">2004</MenuItem>
    </DropdownButton> */}

    

      <div>
  <Dropdown variant="success" options={options} onChange={(value) => {this.onSelect(value)}} value={defaultOption} placeholder="List of year"/>
  </div>
    </Navbar>
  );

  }
}

export default connect()(SearchBar);
