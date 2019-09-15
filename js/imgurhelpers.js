/*string url: imgur album tag string thing
function callback(object response): callback function
object response: result album*/
function getAlbum(url,callback)
{
    var r=new XMLHttpRequest();
    r.open("GET",`https://api.imgur.com/3/album/${url}/images`);

    r.onreadystatechange=()=>{
        if (r.readyState==4)
        {
            callback(JSON.parse(r.response));
        }
    };

    r.setRequestHeader("Authorization","Client-ID 28bf65f46c4de3c");
    r.send();
}

//same input/return style as getAlbum()
function getAlbumInfo(url,callback)
{
    var r=new XMLHttpRequest();
    r.open("GET",`https://api.imgur.com/3/album/${url}`);

    r.onreadystatechange=()=>{
        if (r.readyState==4)
        {
            callback(JSON.parse(r.response));
        }
    };

    r.setRequestHeader("Authorization","Client-ID 28bf65f46c4de3c");
    r.send();
}

function viewLimits()
{
    var r=new XMLHttpRequest();
    r.open("GET","https://api.imgur.com/3/credits");

    r.onreadystatechange=()=>{
        if (r.readyState==4)
        {
            console.log(r.response);
        }
    };

    r.setRequestHeader("Authorization","Client-ID 28bf65f46c4de3c");
    r.send();
}

export {getAlbum,getAlbumInfo,viewLimits};