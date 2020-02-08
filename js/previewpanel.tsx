import React from "react";
declare const InstrinsicElements:any;

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

/* PreviewThumbnail(string thumbnailurl) */
class PreviewThumbnail extends React.Component
{
  props:{
    thumbnailurl:string
  }

  render()
  {
    return <img src={this.props.thumbnailurl}/>;
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