import {createStore} from "redux";

interface LoadImgurImgsAction
{
    type:"loadImgurImgs"
    data:ImageObject[]
}

interface ChangeCurrentIndexAction
{
    type:"changeCurrentIndex"
    newIndex:number
}

type ReduxAction=LoadImgurImgsAction|ChangeCurrentIndexAction;

var store:TheStore;

//load imgur images, give it array of imgur image data objects from an imgur api call
export function loadImgurImgsAction(data:ImageObject[]):void
{
    store.dispatch({
        type:"loadImgurImgs",
        data
    });
}

// store action to update the current index to the provided current index
export function changeCurrentImageIndexAction(newIndex:number):void
{
    store.dispatch({
        type:"changeCurrentIndex",
        newIndex
    });
}

//reducer for imgs, array containing loaded images
function imgsReduce(imgs:ImageObject[],act:ReduxAction):ImageObject[]
{
    if (act.type=="loadImgurImgs")
    {
        return _.map(act.data,(x:ImageObject)=>{
            return {
                link:x.link
            };
        });
    }

    return imgs;
}

// takes in the current index part of the store and returns a new current index based on the action
function currentIndexReduce(currentindex:number,act:ReduxAction):number
{
    if (act.type=="changeCurrentIndex")
    {
        return act.newIndex;
    }

    return currentindex;
}

store=createStore((state:TheStore,act:ReduxAction)=>{
    return {
        imgs:imgsReduce(state.imgs,act),
        currentIndex:currentIndexReduce(state.currentIndex,act)
    };
},{
    imgs:[],
    currentIndex:0
});

export default store;