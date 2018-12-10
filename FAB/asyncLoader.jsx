import React from 'react';
import ReactDom from 'react-dom';
import Loadable from 'react-loadable';

function AsyncLoader (paths){
    const components = paths.map(path=>{
        const comp = Loadable({
            loader: () => import(/* webpackChunkName: 'mainAppAsync/[request]' */ `./baseApp/${path}`).catch(e=>console.log(e)),
            loading:() => <h1> "loading" </h1>
        })
        loadedComponents[path] = comp;
        return comp;
    }
    );

    return components.map(C=><C/>)
}

export default AsyncLoader;