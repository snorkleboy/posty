import { connect } from 'react-redux';
import React from 'react';
import featureProvider from "./featureProvider"
export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export const mapStateToProps = (state, ownProps) => {
    const thisFeaturePoint = ownProps.featurePointName;
    return {
        FeaturePointChildren : state.features.featurePointToComponentMap[thisFeaturePoint] || []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(featureProvider);