export default function (featureDirectoryPath){
    return import(
        /* 
        webpackChunkName: 'features/[request]',
        webpackMode: "eager",
        webpackPrefetch: true 
        */
        `./features/${featureDirectoryPath}/featurePackage.js`
    ).then(module=>module.default);
}