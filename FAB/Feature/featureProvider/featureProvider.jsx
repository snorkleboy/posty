import React from 'react';
import ReactDOM from 'react-dom'
import asyncImport from "frontend/asyncImport" 
export default class featureProvider extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        if (Array.isArray(this.children)) {
            console.warn("Feature provider does not support multiple children");
        }
        const featurePointName = this.props.featurePointName;
        const FeaturePointChildren = this.props.FeaturePointChildren;
        return React.cloneElement(this.props.children,{FeaturePointChildren});
    }
    
}




