import featurePoints from "./featurePoints";

const asFeaturePartial = (destinationFeaturePoint,name ,decorators = []) => {
   const makePackage = (component) => (
        {
            componentPackage: {
                destinationFeaturePoint, decorators, name, component
            }
        }
   )
    makePackage.asDecoration = (decorationName)=>(component)=>({
        componentPackage: {
            destinationFeaturePoint, decorators, name, component,asDecorator:decorationName
        }
    })
    return makePackage;
}

const asDecorator = (name,props)=>({
    name,props
})

export {asFeaturePartial,featurePoints};

// //Feature
// //-a collection of ComponentPackages for mapping to featurePoints and decorating.
// //-dynamically constructs factory methods to decorate itself from its componentPackages
// //-can resolve itself to a map of {featurePoint:[componentMappings]}
// function Feature (componentPackages,name){
//     this.name = name;
//     this.componentPackages = _.cloneDeep(componentPackages);
//     this.componentPackages.forEach((package,i)=>{
//         if (package.decorators){
//             package.decorators.forEach(decorator=>{
//                 this["with"+decorator.name] = function(){
//                     const clone = new Feature(this.componentPackages);
//                     clone.componentPackages[i].decorations = _.merge(clone.componentPackages[i].decorations,decorator.props,mergeConcater);
//                     return clone;
//                 };
//             })
//         }
//     })
// }
// Feature.prototype.map = function(){
//     const subMap = {};
//     this.componentPackages.forEach(componentPackage=> {
//         const featurePoint = componentPackage.componentMapping.featurePoint;
//         const path = componentPackage.componentMapping.path;
//         const props = componentPackage.decorations;
//         if(subMap[featurePoint]){
//             subMap[featurePoint].push({path,props})
//         }else{
//             subMap[featurePoint] = [{path,props}]
//         }
//     })
//     return subMap;
// };
// //ComponentPackage
// //-wrapper around a ComponentMapping that accumilates decoration and sends them as props to be injected into the component.
// //-accumilates decoration through dynamic Feature factory methods mapped from these decorators.
// function ComponentPackage(componentMapping,decorators,decorations={}){
//     this.componentMapping = componentMapping;
//     this.decorators = decorators;
//     this.decorations = decorations;
// }
// //ComponentMapping
// //-maps component path to its position in the app( named as feature point)
// function ComponentMapping(path,featurePoint){
//     this.featurePoint = featurePoint;
//     this.path = path;
// }
//
// function featureToMap(features){
//     let map = {};
//     features.forEach(feature=>{
//         map = _.mergeWith(map,feature.map(),mergeConcater)
//         console.log(features.length,feature,map)
//
//     })
//     return map;
// }
//
// function mergeConcater(objValue, srcValue) {
//     if (_.isArray(objValue)) {
//         return objValue.concat(srcValue);
//     }
// }
//


