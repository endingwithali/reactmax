// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status == "complete") {
//       if (tab.url.indexOf("https://www.REACT.co.jp/") != -1) {
//         chrome.tabs.create({ url: "https://nory-soft.web.app/" });
//       }
//     }
//   });


to build run 

```
npm run build
```

rebuild dynamically on save 
npx webpack  --watch


js run after random time without timing out main thread 

https://codepen.io/taable/pen/gOQMgmd