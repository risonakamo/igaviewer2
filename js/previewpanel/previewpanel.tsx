import React from "react";
import {connect} from "react-redux";

import {togglePanelShowing} from "../thestore";

import "./previewpanel.less";

/* PreviewPanel(STORE-ImageObject[] imgs, STORE-int currentImageIndex, STORE-bool showing,
    callback navigateImage) */
class PreviewPanel extends React.PureComponent
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
    this.navigateAction=this.navigateAction.bind(this);
  }

  // click action, use navigate image
  navigateAction()
  {
    this.props.navigateImage(this.props.indexNumber);
  }

  // double click action, also close the panel using Store function, single click
  // action already navigates to the image.
  closePanelAction()
  {
    togglePanelShowing();
  }

  render()
  {
    return <a className={`thumbnail ${this.props.selected?"selected":""}`} onClick={this.navigateAction}
      onDoubleClick={this.closePanelAction}>
      <img src={this.props.thumbnailurl}/>
      <div className="select-border"></div>
    </a>;
  }
}

// give it imgur url, converts it into a thumbnail url
function convertThumbnail(url:string):string
{
  if (url.search(/i\.nhentai\.net/)>=0)
  {
    return convertThumbnailNH(url);
  }

  // match1 should be the ID of the image
  // match2 should be the file extension of the image, including the period
  var match=url.match(/https:\/\/i\.imgur\.com\/(\w+)(\.\w+)/);

  if (!match)
  {
    return "";
  }

  return `https://i.imgur.com/${match[1]}b${match[2]}`;
}

// give it nh url to return thumbnail of nh image
function convertThumbnailNH(url:string):string
{
  // match1=gallery id
  // match2=thumbnail number
  var match=url.match(/i\.nhentai\.net\/galleries\/(\d+)\/(\d+)/);

  return `https://t.nhentai.net/galleries/${match[1]}/${match[2]}t.jpg`;
}

export default connect((storestate:TheStore)=>{
  return {
    imgs:storestate.imgs,
    currentImageIndex:storestate.currentIndex,
    showing:storestate.panelShowing
  };
})(PreviewPanel);