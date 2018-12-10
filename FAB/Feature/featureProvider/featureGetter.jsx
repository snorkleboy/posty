import React from 'react';
import ReactDOM from 'react-dom'
import asyncImport from "frontend/asyncImport"
import _ from "lodash"
import {reducerReplacer} from "baseApp/store/configureStore";

const featureGetter = ({featuresToLoad,loadFeatures})=> {
    if (featuresToLoad){
        const promises = [];
        Object.values(featuresToLoad).forEach(featureDescriptor=>{
            promises.push(
                asyncImport(featureDescriptor.featureDirectoryName)
                    .then(featurePackage=> {
                        featurePackage._decoratorsToUse = featureDescriptor.decorators;
                        return featurePackage
                    })
                    .then(featurePackage=>{return featurePackage})
            )
        })
        Promise.all(promises)
            .then(featurePackages=>{
                loadFeatures(mapFeaturesToFeaturePoints(featurePackages));
            })
    }
        return null;
}


function mapFeaturesToFeaturePoints(loadedFeatures){
    const featurePointToComponentMap = {};

    loadedFeatures.forEach((feature,i)=>{
        
        const decoratorNames = feature._decoratorsToUse || [];
        feature.forEach((componentPackageWrapper,k)=>{
            const componentPackage = componentPackageWrapper.componentPackage;
            if (!componentPackage.asDecorator || decoratorNames.includes(componentPackage.asDecorator)){
                const destination = componentPackage.destinationFeaturePoint;
                componentPackage.props = {}
                if (decoratorNames && componentPackage.decorators){
                    componentPackage.decorators.forEach(decorator=>{
                        if (decoratorNames.includes(decorator.name)){
                            componentPackage.props = _.merge({},componentPackage.props,decorator.props)
                        }
                    })
                }
                componentPackage.props.name = componentPackage.name;

                if(featurePointToComponentMap[destination]){
                    featurePointToComponentMap[destination].push(componentPackage)
                }else{
                    featurePointToComponentMap[destination] =[componentPackage];
                }
            }
        })
        
    })
    if (featurePointToComponentMap["registerReducers"]){
        const reducers = {};
        const reducerPackages = featurePointToComponentMap["registerReducers"];
        reducerPackages.forEach(redPackage=>{
            reducers[redPackage.name]  = redPackage.component
        })
        reducerReplacer.injectReducers(reducers)
    }
    return featurePointToComponentMap
}


export default featureGetter;