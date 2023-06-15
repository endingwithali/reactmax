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
        }
        video.play();
    })
}
