import AWS from "aws-sdk";




AWS.config.region = 'us-east-2'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.AWS_COGNITO_POOL
})

const rekog = new AWS.Rekognition()
let emotionName = document.createElement("p")
const emotions = ["SAD", 'CALM', 'SURPRISED', 'FEAR', 'CONFUSED', 'ANGRY', 'HAPPY', 'DISGUSTED']
let video = document.createElement("video");
let canvas = document.createElement("canvas");
let photo = document.createElement("img");
let [width, height] = [640, 480];

window.onload = () => {

    let banner = document.createElement("div");
    let nav = document.getElementsByTagName("NAV")[0]
    emotionName.innerText="beeans"
    banner.id="emotionBanner"
    banner.className="h-8 text-center"
    banner.style.backgroundColor="#32CD32"
    banner.appendChild(emotionName)
    
    nav.parentNode.insertBefore(banner, nav);
    renderFace()
}

const captureFace = () =>{
    let data = navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then((stream)=>{
        window.stream = stream;
        video.srcObject = stream;
        video.play();
        return "playtime"
    }).catch((err)=> {
        console.error(`An error occurred: ${err}`);
    }).then((statement) => {
        video.onloadedmetadata = async () =>  {
            await new Promise(resolve => setTimeout(resolve, 1000))
            canvas.height=height
            canvas.width=width
            let context = canvas.getContext('2d')
            context.drawImage(video, 0,0, width, height)
            let imageData = canvas.toDataURL("img/png")
            photo.setAttribute("src", imageData);
            document.body.appendChild(video)
            document.body.appendChild(photo)

            data = imageData
            video.play();
            return processFace(data)
        }
  
    })
    return data
}


const processFace = (faceBlob) => {
    console.log(faceBlob)
    console.log("FACEBLOB")
    const image = atob(faceBlob.split("data:image/png;base64,")[1]);
    const length = image.length;
    const imageBytes = new ArrayBuffer(length);
    const ua = new Uint8Array(imageBytes);
    for (var i = 0; i < length; i++) {
      ua[i] = image.charCodeAt(i);
    }
    console.log(ua)
    let params = {
        "Attributes": [ "EMOTIONS" ],
        "Image": { 
           "Bytes": ua,
        },
     }
    return  new Promise( resolve => {rekog.detectFaces(params, function(err, response) {
        if (err){
            console.log(err)
        }
        console.log(response);
        resolve(response)
    })
    })
}



 const renderFace = () => {
    // Select a random header from the array
    // var header = headers[Math.floor(Math.random() * headers.length)];
    // Change the text of the h1 element
    // document.getElementById("random-header").innerText = header;
    // Set the delay to a random number of seconds between 1 and 2
    // const rndInt = Math.floor(Math.random() * 2) + 1
    // if (rndInt == 1){ 
    captureFace().then(value =>{
        console.log("getitng value")
        console.log(value)
    })
    // }   
    // else {
    //     changeEmote()
    // }


    // var delay = Math.random() * 10000 + 1000;
    // setTimeout(renderFace, delay);
}
