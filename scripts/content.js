import AWS from "aws-sdk";




console.log(process.env.TEST)
AWS.config.region = 'us-east-2'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.AWS_COGNITO_POOL
})

const rekog = new AWS.Rekognition()
let emotionName = document.createElement("p")
const emotions = ["SAD", 'CALM', 'SURPRISED', 'FEAR', 'CONFUSED', 'ANGRY', 'HAPPY', 'DISGUSTED']


window.onload = () => {
    let video = document.createElement("video");
    let canvas = document.createElement("canvas");
    let photo = document.createElement("img");
    let [width, height] = [640, 480];
    let banner = document.createElement("div");
    let nav = document.getElementsByTagName("NAV")[0]
    console.log(nav)
    emotionName.innerText="beeans"
    banner.id="emotionBanner"
    banner.className="h-8 text-center"
    banner.style.backgroundColor="#32CD32"
    banner.appendChild(emotionName)
    
    nav.parentNode.insertBefore(banner, nav);
    

    navigator.mediaDevices
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
            console.log("in playtime");
            await new Promise(resolve => setTimeout(resolve, 1000))
            canvas.height=height
            canvas.width=width
            let context = canvas.getContext('2d')
            context.drawImage(video, 0,0, width, height)
            let data = canvas.toDataURL("img/png")
            photo.setAttribute("src", data);
    
            document.body.appendChild(video)
            document.body.appendChild(photo)

            // reactMax()
        }
        video.play();
        renderFace()
    })
}


const processFace = async (faceBlob) => {
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
    rekog.detectFaces(params, function(err, response) {
        if (err){
            console.log(err)
        }
        console.log(response);
    })
}


 const renderFace = () => {
    // Select a random header from the array
    // var header = headers[Math.floor(Math.random() * headers.length)];
    // Change the text of the h1 element
    // document.getElementById("random-header").innerText = header;
    // Set the delay to a random number of seconds between 1 and 2
    const rndInt = Math.floor(Math.random() * 2) + 1
    if (rndInt == 1){ 
        processFace()
    }   
    else {

    }


    var delay = Math.random() * 10000 + 1000;
    console.log(delay)

    // processFace(data)
    setTimeout(renderFace, delay);
}
changeHeader();

const reactMax = async () => {
    // while (true){

        const rndInt = Math.floor(Math.random() * 2) + 1
        if (rndInt == 1){ 
            let number = Math.random()*10000
            console.log(number)

        }   
        // await new Promise(resolve => setTimeout(resolve, Math.random()*1000))


    // }
    


}


/* 
const uniqueName = `${tempFolder}${tempName}.${type.ext}`;
  const uploadPromise = uploadImage(imageBuffer, uniqueName, type);
  const tempImageData = await uploadPromise;

  // should this be done uploading to AWS or sent as encoded file
  console.log("UPLOADED TEMP IMAGE");
  console.log(tempImageData);
  const params = {
    CollectionId: rekognitionCollection,
    FaceMatchThreshold: recThreshold,
    Image: {
      S3Object: {
        Bucket: imageBucket,
        Name: uniqueName
      }
    }
  };

  const searchFacesByImagePromise = rekognition
    .searchFacesByImage(params)
    .promise();

  const imageData = await searchFacesByImagePromise.catch(error => {
    console.error("ERROR: problems uploading profile image");
    console.error(error);
    throw "Error: recognize_image upload image";
  });

  return imageData["FaceMatches"][0];

  */

