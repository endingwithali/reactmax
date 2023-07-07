import AWS from "aws-sdk";

AWS.config.region = "us-east-2";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: process.env.AWS_COGNITO_POOL,
});

const rekog = new AWS.Rekognition();
let emotionName = document.createElement("p");
const emotions = [
  "SAD",
  "CALM",
  "SURPRISED",
  "FEAR",
  "CONFUSED",
  "ANGRY",
  "HAPPY",
  "DISGUSTED",
];
let video = document.createElement("video");
let canvas = document.createElement("canvas");
let photo = document.createElement("img");
let [width, height] = [640, 480];
let banner = document.createElement("div");

let setEmotion = emotions[Math.floor(Math.random() * emotions.length)];

window.onload = () => {
  alert("QUICK BE " + setEmotion);

  let nav = document.getElementsByTagName("NAV")[0];
  emotionName.innerText = setEmotion;
  banner.id = "emotionBanner";
  banner.className = "h-8 text-center";
  banner.style.backgroundColor = "#32CD32";
  banner.appendChild(emotionName);

  nav.parentNode.insertBefore(banner, nav);
  renderFace();
};

const captureFace = () => {
  return new Promise((resolve) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        window.stream = stream;
        video.srcObject = stream;
        video.play();
        return "playtime";
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      })
      .then((statement) => {
        video.onloadedmetadata = async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          canvas.height = height;
          canvas.width = width;
          let context = canvas.getContext("2d");
          context.drawImage(video, 0, 0, width, height);
          let imageData = canvas.toDataURL("img/png");
          photo.setAttribute("src", imageData);
          document.body.appendChild(video);
          document.body.appendChild(photo);
          video.style.display = "none";
          // photo.style.display='none'

          video.play();
          resolve(processFace(imageData));
        };
      });
  });
};

const processFace = (faceBlob) => {
  const image = atob(faceBlob.split("data:image/png;base64,")[1]);
  const length = image.length;
  const imageBytes = new ArrayBuffer(length);
  const ua = new Uint8Array(imageBytes);
  for (var i = 0; i < length; i++) {
    ua[i] = image.charCodeAt(i);
  }
  let params = {
    Attributes: ["EMOTIONS"],
    Image: {
      Bytes: ua,
    },
  };
  return new Promise((resolve) => {
    rekog.detectFaces(params, function (err, response) {
      if (err) {
        console.log(err);
      }
      resolve(response);
    });
  });
};

let status = true;
let main = document.getElementsByTagName("main")[0];

const renderFace = () => {
  if (status) {
    let rng = Math.random();
    if (rng < 0.5) {
      console.log("check if face is as expected, if not hide emotes ");
      captureFace().then((value) => {
        let photoEmotion = value["FaceDetails"][0].Emotions[0].Type;
        console.log("expected " + setEmotion + " received " + photoEmotion);
        if (photoEmotion != setEmotion) {
          main.style.display = "none";
          banner.style.backgroundColor = "#32CD32";
          status = false;
        }
      });
    } else {
      console.log("change and check emotions");
      setEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      banner.style.backgroundColor = "#FF0000";
      emotionName.innerText = setEmotion;
      setTimeout(500);
      captureFace().then((value) => {
        let photoEmotion = value["FaceDetails"][0].Emotions[0].Type;
        console.log("expected " + setEmotion + " received " + photoEmotion);
        if (photoEmotion != setEmotion) {
          main.style.display = "none";
          banner.style.backgroundColor = "#32CD32";
          status = false;
        } else {
          banner.style.backgroundColor = "#FF0000";
        }
      });
    }
    let delay = Math.random() * 1000 + 1000;
    setTimeout(renderFace, delay);
  } else {
    if (!status) {
      console.log("In failed face check, looping");
      captureFace().then((value) => {
        console.log(value);
        let photoEmotion = value["FaceDetails"][0].Emotions[0].Type;
        console.log("expected " + setEmotion + " received " + photoEmotion);
        if (photoEmotion != setEmotion) {
          console.log("no match");
        } else {
          status = true;
          console.log("match");
          main.style.display = "block";
        }
      });
      console.log("ran");
      setTimeout(renderFace, 1000);
    }
  }
  // var delay = Math.random() * 10000 + 1000;
  // setTimeout(renderFace, delay);
};
