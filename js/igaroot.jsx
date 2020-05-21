import React from "react";
import {connect} from "react-redux";

import {getAlbum,getAlbumInfo} from "./imgurhelpers";
import {loadImgurImgsAction,changeCurrentImageIndexAction,togglePanelShowing} from "./thestore";
import PreviewPanel from "./previewpanel/previewpanel";
import LinkEntry from "./linkentry/linkentry";

import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";

/* IgaRoot(store-array imgs,store-int currentImageIndex)
   imgs: array of imgs to load, from the store
   currentImageIndex: the current image index, provided by store*/
class IgaRoot extends React.Component
{
  constructor(props)
  {
    super(props);
    this.navigateImage=this.navigateImage.bind(this);
    this.imgurLoad=this.imgurLoad.bind(this);
    this.linksLoad=this.linksLoad.bind(this);

    this.state={
      currentImage:null,
      linkentryHide:false
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
      // transition:false,
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

        else if ((this.theviewer.containerData.width/this.theviewer.containerData.height)>this.theviewer.imageData.aspectRatio)
        {
          this.fitHeight();
        }

        else
        {
          this.fitWidth();
        }
      }
    });

    // getAlbumInfo("ZVPTV",(data)=>{
    //   console.log(data);
    // });

    var imgurHash=window.location.hash.split("#");

    if (imgurHash.length>1)
    {
      this.imgurLoad(imgurHash[1]);
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
    this.theviewer.moveTo(0,this.theviewer.containerData.height/2-this.theviewer.imageData.height/2);
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
    changeCurrentImageIndexAction(imgIndex);
    this.setState({
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

      if (e.key=="e")
      {
        this.theviewer.zoom(.1,true);
      }

      else if (e.key=="q")
      {
        this.theviewer.zoom(-.1,true);
      }

      else if (e.key=="ArrowRight" || e.key==" " || e.key=="d")
      {
        this.navigateImage(this.props.currentImageIndex+1);
      }

      else if (e.key=="ArrowLeft" || e.key=="a")
      {
        this.navigateImage(this.props.currentImageIndex-1);
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

      else if (e.key=="Escape")
      {
        togglePanelShowing();
      }
    });
  }

  // load an array of non imgur links
  linksLoad(links)
  {
    loadImgurImgsAction(_.map(links,(x)=>{
      return {
        link:x
      };
    }));

    this.setState({
      linkentryHide:true
    });
  }

  // load an imgur album id
  imgurLoad(albumid)
  {
    window.location.hash=albumid;

    getAlbum(albumid,(data)=>{
      loadImgurImgsAction(data.data);

      this.setState({
        linkentryHide:true
      });
    });
  }

  render()
  {
    if (this.theviewer)
    {
      this.theviewer.view(this.props.currentImageIndex);
    }

    return <>
      <div className="the-viewer">
        <ul ref={this.theviewerElement}>
          {_.map(this.props.imgs,(x,i)=>{
            return <li key={i}><img src={x.link}/></li>;
          })}
        </ul>
      </div>
      <PreviewPanel navigateImage={this.navigateImage}/>
      <LinkEntry hide={this.state.linkentryHide} loadImgur={this.imgurLoad} loadLinks={this.linksLoad}/>
    </>;
  }
}

export default connect((storestate)=>{
  return {
    imgs:storestate.imgs,
    currentImageIndex:storestate.currentIndex
  };
})(IgaRoot);