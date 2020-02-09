import React from "react";
import {connect} from "react-redux";

import {changeCurrentImageIndexAction} from "../thestore";

import "./previewpanel.less";

/* PreviewPanel(STORE-ImageObject[] imgs, STORE-int currentImageIndex, STORE-bool showing,
    callback navigateImage) */
class PreviewPanel extends React.Component
{
  props:{
    imgs:ImageObject[] // STORE: array of image objects
    currentImageIndex:number // STORE: index of the current image in the imgs array
    showing:boolean // STORE: show the preview panel or not
    navigateImage(imgIndex:number):void // parent function to call to navigate to a image index
  }

  render()
  {
    var thumbnails=_.map(this.props.imgs,(x:ImageObject,i:number)=>{
      var selected=this.props.currentImageIndex==i?true:false;

      return <PreviewThumbnail thumbnailurl={convertThumbnail(x.link)}
        key={i} selected={selected} indexNumber={i} navigateImage={this.props.navigateImage}/>;
    });

    return <div className={`preview-panel ${this.props.showing?"":"hidden"}`}>
      {thumbnails}
    </div>;
  }
}

/* PreviewThumbnail(string thumbnailurl, bool selected, int indexNumber, callback navigateImage) */
class PreviewThumbnail extends React.Component
{
  props:{
    thumbnailurl:string // the url of the thumbnail to display, needs to already be a
                        // valid thumbail url that is the correct size
    selected:boolean // whether the thumbnail should show as selected
    indexNumber:number // the index number of this thumbnail
    navigateImage(imgIndex:number):void // parent function to call to navigate to a image index
  }

  constructor(props:any)
  {
    super(props);
    this.clickAction=this.clickAction.bind(this);
  }

  clickAction()
  {
    this.props.navigateImage(this.props.indexNumber);
  }

  render()
  {
    return <a className={`thumbnail ${this.props.selected?"selected":""}`} onClick={this.clickAction}>
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

export default connect((storestate:TheStore)=>{
  return {
    imgs:storestate.imgs,
    currentImageIndex:storestate.currentIndex,
    showing:storestate.panelShowing
  };
})(PreviewPanel);