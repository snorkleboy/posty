import { connect } from 'react-redux';
import React from 'react';
import featureGetter from "./featureGetter"
import {receiveFeaturePointToComponentMap} from "baseRedux/actions/featureActions/featureActions"
export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadFeatures:(features)=>dispatch(receiveFeaturePointToComponentMap(features))
    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        featuresToLoad:state.features.featuresToLoad
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(featureGetter);