import {createStore} from "redux";

function imgsReduce(imgs,act)
{
    if (act.type=="addImg")
    {
        imgs.push(act.img);
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