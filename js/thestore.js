import _ from "lodash";
import {createStore} from "redux";

/* actions:
   loadImgurImgs
   {
       object-array data: array of imgur image data objects from an imgur api call
   }
 */

//reducer for imgs, array containing loaded images
function imgsReduce(imgs,act)
{
    if (act.type=="loadImgurImgs")
    {
        return _.map(act.data,(x)=>{
            return x.link;
        });
    }

    return imgs;
}

var store=createStore((state,act)=>{
    return {
        imgs:imgsReduce(state.imgs,act)
    };
},{
    imgs:[]
});

export default store;