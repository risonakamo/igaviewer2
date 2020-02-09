declare module "react";
declare module "react-redux";

declare const _:any;

declare namespace JSX
{
    interface IntrinsicElements
    {
        [elementName:string]:any
    }
}

interface ImageObject
{
    link:string
}

interface TheStore
{
    imgs:ImageObject[]
    currentIndex:number
    panelShowing:boolean

    dispatch: Function
}