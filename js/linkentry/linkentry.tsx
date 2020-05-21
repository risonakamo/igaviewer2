import React from "react";

import "./linkentry.less";

export default class LinkEntry extends React.Component
{
  render()
  {
    return <div className="link-entry">
      <textarea className="link-input" placeholder="imgur id or image links"></textarea>
    </div>;
  }
}