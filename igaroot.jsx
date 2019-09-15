import React from "react";
import {connect} from "react-redux";

import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";

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

    window.viewer=this.theviewer;
    window.igaroot=this;
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

  render()
  {
    return <>
      <div className="the-viewer">
        <ul ref={this.theviewerElement}>
          <li><img src="testball.jpg"/></li>
          <li><img src="https://i.imgur.com/moL99Yv.jpg"/></li>
          <li><img src="https://i.imgur.com/C1AQTl5.jpg"/></li>
        </ul>
      </div>
    </>;
  }
}

export default connect()(IgaRoot);