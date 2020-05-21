import React from "react";

import "./linkentry.less";

interface ParsedInput
{
  type:"IMGUR"|"LINKS"
  value:string[]|string
}

interface LinkEntryProps
{
  hide:boolean //hide link entry component
  loadImgur:(albumid:string)=>void //function to load an imgur album id
  loadLinks:(links:string[])=>void //function to load array of link
}

/* LinkEntry(bool hide, function loadImgur, function loadLinks) */
export default class LinkEntry extends React.Component
{
  props:LinkEntryProps

  linkinputref:any

  constructor(props:LinkEntryProps)
  {
    super(props);
    this.keyHandler=this.keyHandler.bind(this);

    this.linkinputref=React.createRef();
  }

  componentDidMount()
  {
    this.linkinputref.current.focus();
  }

  // handle ctrl entry submit key command
  keyHandler(e:KeyboardEvent):void
  {
    var target=e.currentTarget as HTMLTextAreaElement;
    if ((e.key=="Enter" || e.key=="\n") && e.ctrlKey)
    {
      var parsedinput=parseInput(target.value);

      if (parsedinput.type=="IMGUR")
      {
        this.props.loadImgur(parsedinput.value as string);
      }

      else
      {
        this.props.loadLinks(parsedinput.value as string[]);
      }
    }
  }

  render()
  {
    return <div className="link-entry" style={{display:this.props.hide?"none":""}}>
      <textarea className="link-input" placeholder="imgur album url or image links"
        onKeyPress={this.keyHandler} ref={this.linkinputref}></textarea>
    </div>;
  }
}

// given a string, determine if it is a enter separated list of random stuff or an imgur
// album url
function parseInput(input:string):ParsedInput|null
{
  var splitinput=input.trim().split("\n");
  if (!splitinput.length)
  {
    return null;
  }

  if (splitinput[0].search(/imgur\.com\/a\//)>=0)
  {
    return {
      type:"IMGUR",
      value:splitinput[0].match(/imgur\.com\/a\/(\w+)/)[1]
    };
  }

  return {
    type:"LINKS",
    value:splitinput
  };
}