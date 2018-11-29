```
posti-t note app


app is
ribbon menu
clickable canvas* of postables
object panel of postables

postables are 
    postable - can be placed at location in canvas
    createable - onclick creation steps as well as object panel creation
    configurable - its properties can be sent to a menuor controller with callbacks that change the object, live;
    savible - can be serialized and saved to boot from database or different 'tables' of postables

post-its : postable are 
    selectable - when clicked/selected they are highlighted, wribbon menu changes from dispalying postable factory to post it config
    movable - when click-dragged/repositioned they are moved
    resizeable - when corner-click-dragged they are resizeable'

arrows : postable are 
    selectable - when clicked/selected they are highlighted, wribbon menu changes from dispalying postable factory to arrows config
    movable - when click-dragged/repositioned they are moved
    

Users can
    - create account
    - save canvass instance
    - load canvass instance
    - allow other users to load canvass instance
    - invite other users to use
    - set others permission 

    user
        - has canvassInstance
    canvasInstance
        - has postable[]
        - has postableFactory config settings
        - creator
        - allowed viewers
        - allowed editors

implimentation

db:
    users {id}
    CanvasInstances{id,userId}
    viewers{canvasId,userId}
    editors{canvasId,userId}

controls:
    create/edit User
    create/edit CanvasInstance
    AddViewer
    AddEditor


```
postableFactory{
    config:{
    color:
        randomizeFromList:checkbox=>()
        backgroundColor:color / color[]
        outlineColor:color

    outline:
        lineWidth: int
        cornerRouding: percent

    text:
        textColor :color
        font:font
        size:size
        overflow/hide
    }
    makeConcreteA(this.options)
    makeConcreteB(this.options)
}
```
```
    redux state:{
        postables:{
            PostableFactoryConfig:{obj}
            postables:[obj,obj];
        }
        user:{
            obj
        }
    }
```
...
    <Provider>
        ...
            <WribbonMenu/>
            <CanvassController>
                <CavassArea/>
            <CanvassController/>
        ...
    <Provider/>
...
 - WribbonMenu has Postable Factory and its controls
 - CanvassController gets live-configured PostableFactory instance
 - CanvassController sizes canvassArea, provides onClick Callbacks for creation

 - ribbon menu and canvass controller share Postable Factory
...
<Selectable> - detects click on Concrete-Postable and adds css outline
    <Movable> - detects click drag on Concrete-Postable and will change its position
        <Resizeable> - draws white sqaures around Concrete-Postable that can be click dragged to resize Concrete-Postable
            <Concrete-Postable/>
        <Resizeable/>
    <Movable/>
<Selectable/>
...

* virtual canvas not html5 canvas
```