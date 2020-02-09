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

interface TogglePanelShowing
{
    type:"togglePanelShowing"
}

type ReduxAction=LoadImgurImgsAction|ChangeCurrentIndexAction|TogglePanelShowing;

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

// store action to toggle panel showing
export function togglePanelShowing():void
{
    store.dispatch({
        type:"togglePanelShowing"
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

function panelShowingReduce(showing:boolean,act:ReduxAction):boolean
{
    if (act.type=="togglePanelShowing")
    {
        return !showing;
    }

    return showing;
}

store=createStore((state:TheStore,act:ReduxAction)=>{
    return {
        imgs:imgsReduce(state.imgs,act),
        currentIndex:currentIndexReduce(state.currentIndex,act),
        panelShowing:panelShowingReduce(state.panelShowing,act)
    };
},{
    imgs:[],
    currentIndex:0,
    panelShowing:false
});

export default store;