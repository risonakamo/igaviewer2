import React from "react";
import {connect} from "react-redux";

import {getAlbum,getAlbumInfo} from "./imgurhelpers";
import {loadImgurImgsAction} from "./thestore";

import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";

/* IgaRoot(store-array imgs)
   imgs: array of imgs to load, from the store*/
class IgaRoot extends React.Component
{
  constructor(props)
  {
    super(props);

    this.theviewer; //the actual viewer object
    this.theviewerElement=React.createRef(); //the element viewer is attached to
  }

  componentDidMount()
  {
    this.theviewer=new Viewer(this.theviewerElement.current,{
      inline:true,
      title:false,
      ready:()=>{
        this.theviewer.full();
      }
    });

    // getAlbumInfo("ZVPTV",(data)=>{
    //   console.log(data);
    // });

    getAlbum("ZVPTV",(data)=>{
      loadImgurImgsAction(data.data);
    });

    window.viewer=this.theviewer;
    window.igaroot=this;
  }

  componentDidUpdate()
  {
    this.theviewer.update();
  }

  //do fit width on the viewer
  fitWidth()
  {
    this.theviewer.zoomTo(this.theviewer.containerData.width/this.theviewer.imageData.naturalWidth);
    this.theviewer.moveTo(0);
  }

  //do fit height on the viewer
  fitHeight()
  {
    this.theviewer.zoomTo(this.theviewer.containerData.height/this.theviewer.imageData.naturalHeight);
    this.theviewer.moveTo(this.theviewer.containerData.width/2-this.theviewer.imageData.width/2,0);
  }

  //give it array of imgur image data objects, from an imgur api call
  loadImgurImages(data)
  {
    this.props.dispatch({
      type:"loadImgurImgs",
      data
    });
  }

  render()
  {
    return <>
      <div className="the-viewer">
        <ul ref={this.theviewerElement}>
          {_.map(this.props.imgs,(x,i)=>{
            return <li key={i}><img src={x}/></li>;
          })}
        </ul>
      </div>
    </>;
  }
}

export default connect((storestate)=>{
  return {
    imgs:storestate.imgs
  };
})(IgaRoot);