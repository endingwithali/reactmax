import Rekognition from "aws-sdk/clients/rekognition"

window.onload = () => {
    let video = document.createElement("video");
    let canvas = document.createElement("canvas");
    let photo = document.createElement("img");
    let [width, height] = [640, 480];


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
        video.onloadedmetadata = () => {
            console.error("in playtime");
            canvas.height=height
            canvas.width=width
            let context = canvas.getContext('2d')
            context.drawImage(video, 0,0, width, height)
            let data = canvas.toDataURL("img/png")
            photo.setAttribute("src", data);
            console.log(data)
    
            document.body.appendChild(video)
            document.body.appendChild(photo)

            processFace(data)
        }
        video.play();
    })
}



const aws = new AWS.Rekognition()
const processFace = async (face) => {
    //22 char
    let blob = string.slice(22, len(face))
    console.log(blob)
    // let params = {
    //     "Attributes": [ "EMOTIONS" ],
    //     "Image": { 
    //        "Bytes": blob,
    //     },
    //  }
    // aws.detectFaces(params, function(err, response) {
    //     console.log(response);
    // })
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