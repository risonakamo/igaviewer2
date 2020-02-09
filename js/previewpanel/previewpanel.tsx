import React from "react";

import "./previewpanel.less";

interface ImageObject
{
  link:string
}

/* PreviewPanel(ImageObject[] imgs) */
export default class PreviewPanel extends React.Component
{
  props:{
    imgs:ImageObject[] //array of image objects from parent.
  }

  render()
  {
    var thumbnails=_.map(this.props.imgs,(x:ImageObject,i:number)=>{
      return <PreviewThumbnail thumbnailurl={convertThumbnail(x.link)} key={i}/>;
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