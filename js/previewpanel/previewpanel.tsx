import React from "react";
import {connect} from "react-redux";

import "./previewpanel.less";

/* PreviewPanel(STORE-ImageObject[] imgs,STORE-int currentImageIndex) */
class PreviewPanel extends React.Component
{
  props:{
    imgs:ImageObject[] // array of image objects, provided by STORE.
    currentImageIndex:number // index of the current image in the imgs array, provided by store.
  }

  render()
  {
    var thumbnails=_.map(this.props.imgs,(x:ImageObject,i:number)=>{
      var selected=this.props.currentImageIndex==i?true:false;

      return <PreviewThumbnail thumbnailurl={convertThumbnail(x.link)} key={i} selected={selected}/>;
    });

    return <div className="preview-panel">
      {thumbnails}
    </div>;
  }
}

/* PreviewThumbnail(string thumbnailurl,bool selected) */
class PreviewThumbnail extends React.Component
{
  props:{
    thumbnailurl:string // the url of the thumbnail to display, needs to already be a
                        // valid thumbail url that is the correct size
    selected:boolean // whether the thumbnail should show as selected
  }

  render()
  {
    return <a className={`thumbnail ${this.props.selected?"selected":""}`}>
      <img src={this.props.thumbnailurl}/>
      <div className="select-border"></div>
    </a>;
  }
}

// give it imgur url, converts it into a thumbnail url
function convertThumbnail(url:string):string
{
  // match1 should be the ID of the image
  // match2 should be the file extension of the image, including the period
  var match=url.match(/https:\/\/i\.imgur\.com\/(\w+)(\.\w+)/);

  if (!match)
  {
    return "";
  }

  return `https://i.imgur.com/${match[1]}b${match[2]}`;
}

export default connect((storestate:any)=>{
  return {
    imgs:storestate.imgs,
    currentImageIndex:storestate.currentIndex
  };
})(PreviewPanel);