import React from "react";

interface PreviewPanelProps
{
  imgs:{
    link:string
  }[]
}

/* PreviewPanel(array imgs) */
export default class PreviewPanel extends React.Component
{
  props:PreviewPanelProps

  render():any
  {
    if (this.props.imgs.length)
    {
      console.log("imgs from preview panel",this.props.imgs[0]);
    }

    return <div></div>;
  }
}