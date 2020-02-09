import {createStore} from "redux";

var store;

//load imgur images, give it array of imgur image data objects from an imgur api call
export function loadImgurImgsAction(data)
{
    store.dispatch({
        type:"loadImgurImgs",
        data
    });
}

//reducer for imgs, array containing loaded images
function imgsReduce(imgs,act)
{
    if (act.type=="loadImgurImgs")
    {
        return _.map(act.data,(x)=>{
            return {
                link:x.link
            };
        });
    }

    return imgs;
}

store=createStore((state,act)=>{
    return {
        imgs:imgsReduce(state.imgs,act)
    };
},{
    imgs:[]
});

export default store;