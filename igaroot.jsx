import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";

export default class IgaRoot extends React.Component
{
  constructor(props)
  {
    super(props);

    this.theviewer;
    this.theviewerElement=React.createRef();
  }

  componentDidMount()
  {
    this.theviewer=new Viewer(this.theviewerElement.current,{
      inline:true,
      ready:()=>{
        console.log("a");
        this.theviewer.full();
      }
    });
  }

  render()
  {
    return <>
      <div className="viewer-hold">
        <ul ref={this.theviewerElement}>
          <li><img src="testball.jpg"/></li>
          <li><img src="https://i.imgur.com/moL99Yv.jpg"/></li>
        </ul>
      </div>
    </>;
  }
}