## This is a project for [youtube.com/@endingwithali](youtube.com/@endingwithali)

To build, run the following command in terminal:
```
npm run build
```

While working on the project, and dynamically save/update build of project:
```
npx webpack  --watch
```

You will need to create .env with variable for aws cognito pool called
```
AWS_COGNITO_POOL = 
```

You will need to upload this as a chrome extension in [dev mode](https://superuser.com/questions/247651/how-does-one-install-an-extension-for-chrome-browser-from-the-local-file-system#:~:text=Navigate%20to%20chrome%3A%2F%2Fextensions,should%20load%20into%20your%20browser) 


## Tutorials followed:

- js run after random time without timing out main thread: https://codepen.io/taable/pen/gOQMgmd
- implementing front end style aws rekognition **use this tutorial to figure out how to create your cognito values** : https://docs.aws.amazon.com/rekognition/latest/dg/image-bytes-javascript.html