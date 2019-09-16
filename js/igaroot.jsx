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

    this.state={
      currentImage:null,
      currentImageIndex:0
    };

    //image repositioning has not completed, dont save image positioning if the image changes
    this.imageChangeInProgress=false;

    //fit height operation occured, next time it will fit width, resets every image change to fit height
    this.justFitHeight=false;

    this.theviewer; //the actual viewer object
    this.theviewerElement=React.createRef(); //the element viewer is attached to
  }

  componentDidMount()
  {
    this.theviewer=new Viewer(this.theviewerElement.current,{
      inline:true,
      title:false,
      keyboard:false,
      button:false,
      zoomRatio:.3,
      backdrop:false,
      ready:()=>{
        this.theviewer.full();
      },
      viewed:()=>{
        this.imageChangeInProgress=false;
        if (_.get(this.state.currentImage,"zoom"))
        {
          this.theviewer.zoomTo(this.state.currentImage.zoom);
          this.theviewer.moveTo(this.state.currentImage.left,this.state.currentImage.top);
        }
      }
    });

    // getAlbumInfo("ZVPTV",(data)=>{
    //   console.log(data);
    // });

    var imgurHash=window.location.hash.split("#");

    if (imgurHash.length>1)
    {
      getAlbum(imgurHash[1],(data)=>{
        loadImgurImgsAction(data.data);
      });
    }

    this.keyControl();

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

  //navigate to the given image index
  navigateImage(imgIndex)
  {
    if (imgIndex>=this.props.imgs.length || imgIndex<0)
    {
      return;
    }

    var currentimage=this.state.currentImage;
    if (!currentimage)
    {
      currentimage=this.props.imgs[0];
    }

    // console.log(currentimage);
    // console.log(this.theviewer);

    if (!this.imageChangeInProgress)
    {
      currentimage.zoom=this.theviewer.imageData.ratio;
      currentimage.left=this.theviewer.imageData.left;
      currentimage.top=this.theviewer.imageData.top;
    }

    this.imageChangeInProgress=true;
    this.setState({
      currentImageIndex:imgIndex,
      currentImage:this.props.imgs[imgIndex]
    });
  }

  //deploy global keyboard controls
  keyControl()
  {
    document.addEventListener("keydown",(e)=>{
      // console.log(e.key);
      if (e.key!="f")
      {
        this.justFitHeight=false;
      }

      if (e.key=="ArrowRight" || e.key==" " || e.key=="d")
      {
        this.navigateImage(this.state.currentImageIndex+1);
      }

      else if (e.key=="ArrowLeft" || e.key=="a")
      {
        this.navigateImage(this.state.currentImageIndex-1);
      }

      else if (e.key=="f")
      {
        if (this.justFitHeight)
        {
          this.fitWidth();
          this.justFitHeight=false;
        }

        else
        {
          this.fitHeight();
          this.justFitHeight=true;
        }
      }
    });
  }

  render()
  {
    if (this.theviewer)
    {
      this.theviewer.view(this.state.currentImageIndex);
    }

    return <>
      <div className="the-viewer">
        <ul ref={this.theviewerElement}>
          {_.map(this.props.imgs,(x,i)=>{
            return <li key={i}><img src={x.link}/></li>;
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