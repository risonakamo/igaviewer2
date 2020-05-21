import React from "react";

import "./linkentry.less";

interface LinkEntryProps
{
  hide:boolean //hide link entry component
}

/* LinkEntry(bool hide) */
export default class LinkEntry extends React.Component
{
  props:LinkEntryProps

  render()
  {
    return <div className="link-entry" style={{display:this.props.hide?"none":""}}>
      <textarea className="link-input" placeholder="imgur id or image links"></textarea>
    </div>;
  }
}