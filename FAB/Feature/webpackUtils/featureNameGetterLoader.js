// const loaderUtils = require('loader-utils');
// const fs = require("fs");
//
// const features = [];
// const decorators = {};
//
// function folderNameGetterLoader(input,map,c){
//     const resourcePath = this.resourcePath
//     console.log(resourcePath);
//     let noError = true;
//     let featureName = resourcePath.split("features/");
//     if (!featureName[1]){
//         this.emitWarning(new Error(resourcePath + " is not a valid feature path"))
//         noError=false;
//     }
//     featureName = featureName[1].split("/");
//     if (!featureName[1] || featureName[1] !== "featurePackage.js"){
//         this.emitWarning(new Error(resourcePath + " must be a featurePackage.js to be imported into the base app"))
//         noError=false;
//     }
//    
//     // const decoratorsPath = resourcePath.split("featurePackage.js")[0]+"decorators.json";
//     // const decoratorsExist = fs.existsSync(decoratorsPath);
//     // const tohertry = fs.existsSync("./decorators.js")
//     // const sanity = fs.existsSync(resourcePath);
//     // console.log({decoratorsExist,decoratorsPath,tohertry,sanity,resourcePath})
//     // if(decoratorsExist){
//     //     this.fs.readFile(decoratorsPath,(err, source)=>{
//     //         const loadedDecorators = JSON.parse(source);
//     //         console.log({err, source,loadedDecorators})
//     //
//     //         if(err){
//     //             noError = false;
//     //             this.emitError(new Error("couldnt load decorators.js despite it existing"))
//     //         }
//     //         else if (noError){
//     //             decorators[featureName[0]] = loadedDecorators;
//     //             features.push(featureName[0])
//     //             const manifest = {featureNames:{}};
//     //
//     //             featureName.forEach(name=>{
//     //                 manifest.featureNames[name]=name
//     //                 manifest[name]=decorators[name];
//     //             });
//     //             this.emitFile("./features.json",JSON.stringify(manifest))
//     //         }
//     //     }) 
//     // }
//     //
//
//     return input;
// }

// module.exports = folderNameGetterLoader;