!function(e){function t(t){for(var r,o,s=t[0],h=t[1],u=t[2],g=0,l=[];g<s.length;g++)o=s[g],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&l.push(n[o][0]),n[o]=0;for(r in h)Object.prototype.hasOwnProperty.call(h,r)&&(e[r]=h[r]);for(c&&c(t);l.length;)l.shift()();return a.push.apply(a,u||[]),i()}function i(){for(var e,t=0;t<a.length;t++){for(var i=a[t],r=!0,s=1;s<i.length;s++){var h=i[s];0!==n[h]&&(r=!1)}r&&(a.splice(t--,1),e=o(o.s=i[0]))}return e}var r={},n={0:0},a=[];function o(t){if(r[t])return r[t].exports;var i=r[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=e,o.c=r,o.d=function(e,t,i){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(i,r,function(t){return e[t]}.bind(null,r));return i},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var s=window.webpackJsonp=window.webpackJsonp||[],h=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var c=h;a.push([23,1]),i()}({22:function(e,t,i){},23:function(e,t,i){"use strict";i.r(t);var r=i(5),n=i(0),a=i.n(n),o=i(3),s=i.n(o);var h,u=i(4);function c(e,t){return"loadImgurImgs"==t.type?_.map(t.data,e=>({link:e.link})):e}var g=h=Object(u.b)((e,t)=>({imgs:c(e.imgs,t)}),{imgs:[]}),l=i(11),m=i.n(l);i(21);var d=Object(r.b)(e=>({imgs:e.imgs}))(class extends a.a.Component{constructor(e){super(e),this.state={currentImage:null,currentImageIndex:0},this.imageChangeInProgress=!1,this.justFitHeight=!1,this.theviewer,this.theviewerElement=a.a.createRef()}componentDidMount(){this.theviewer=new m.a(this.theviewerElement.current,{inline:!0,title:!1,keyboard:!1,button:!1,zoomRatio:.3,backdrop:!1,ready:()=>{this.theviewer.full()},viewed:()=>{this.imageChangeInProgress=!1,_.get(this.state.currentImage,"zoom")&&(this.theviewer.zoomTo(this.state.currentImage.zoom),this.theviewer.moveTo(this.state.currentImage.left,this.state.currentImage.top))}});var e,t,i,r=window.location.hash.split("#");r.length>1&&(e=r[1],t=e=>{!function(e){h.dispatch({type:"loadImgurImgs",data:e})}(e.data)},(i=new XMLHttpRequest).open("GET",`https://api.imgur.com/3/album/${e}/images`),i.onreadystatechange=()=>{4==i.readyState&&t(JSON.parse(i.response))},i.setRequestHeader("Authorization","Client-ID 28bf65f46c4de3c"),i.send()),this.keyControl(),window.viewer=this.theviewer,window.igaroot=this}componentDidUpdate(){this.theviewer.update()}fitWidth(){this.theviewer.zoomTo(this.theviewer.containerData.width/this.theviewer.imageData.naturalWidth),this.theviewer.moveTo(0)}fitHeight(){this.theviewer.zoomTo(this.theviewer.containerData.height/this.theviewer.imageData.naturalHeight),this.theviewer.moveTo(this.theviewer.containerData.width/2-this.theviewer.imageData.width/2,0)}navigateImage(e){if(!(e>=this.props.imgs.length||e<0)){var t=this.state.currentImage;t||(t=this.props.imgs[0]),this.imageChangeInProgress||(t.zoom=this.theviewer.imageData.ratio,t.left=this.theviewer.imageData.left,t.top=this.theviewer.imageData.top),this.imageChangeInProgress=!0,this.setState({currentImageIndex:e,currentImage:this.props.imgs[e]})}}keyControl(){document.addEventListener("keydown",e=>{"f"!=e.key&&(this.justFitHeight=!1),"ArrowRight"==e.key||" "==e.key||"d"==e.key?this.navigateImage(this.state.currentImageIndex+1):"ArrowLeft"==e.key||"a"==e.key?this.navigateImage(this.state.currentImageIndex-1):"f"==e.key&&(this.justFitHeight?(this.fitWidth(),this.justFitHeight=!1):(this.fitHeight(),this.justFitHeight=!0))})}render(){return this.theviewer&&this.theviewer.view(this.state.currentImageIndex),a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"the-viewer"},a.a.createElement("ul",{ref:this.theviewerElement},_.map(this.props.imgs,(e,t)=>a.a.createElement("li",{key:t},a.a.createElement("img",{src:e.link}))))))}});i(22);window.onload=function(){s.a.render(a.a.createElement(r.a,{store:g},a.a.createElement(d,null)),document.querySelector(".iga-root"))}}});