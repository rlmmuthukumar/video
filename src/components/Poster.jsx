import React from 'react';
// import { URL_IMG, IMG_SIZE_LARGE } from '../const'
import { Image } from 'react-bootstrap'
import styled from 'styled-components'
import { Glyphicon } from 'react-bootstrap'

import { Button } from 'react-bootstrap'

export default function Poster(props){

  const StyledImg = styled.div`
    &:hover .image{
       opacity:1;
    }
    &:hover .title{
       opacity: ${props.info ? 1:0};
    }
  `;
  // const Info =  styled.div`
  //     position: absolute;
  //     top: 75%;
  //     margin:10px;
  //     color:white;
  //     font-weight:bold;
  //     opacity:0;
  // `;
    
  
  return(
    <StyledImg>
       <h4>{props.title} <Glyphicon glyph={'star'} /> {props.voteAverage} &nbsp;&nbsp; {props.release_date.substring(0,4)} </h4>
      <Image className="image" key={props.id} src={props.path} responsive />
      <div style={{paddingTop:'8px',paddingBottom:'13px'}}>
        <div>
          <input type="checkbox" >
           </input>
           <Button variant="outline-primary"style={{color:'#fff',fontSize:'10px',padding: '5px',marginLeft:'10px',background : 'lightcoral'}}>Add to my list</Button>
           <input type="checkbox" style={{marginLeft:'10px'}} >
           </input>
          <Button style={{color:'#fff',fontSize:'10px',marginLeft:'10px',background : 'lightcoral'}}>Add to my watched list</Button>
       </div>
      </div>
    </StyledImg>
  );
}
