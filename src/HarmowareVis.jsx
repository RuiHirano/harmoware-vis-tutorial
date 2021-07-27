
import React, { useEffect } from 'react';
import { HarmoVisLayers, Container, BasedProps, BasedState, connectToHarmowareVis, MovesLayer, Movesbase, MovesbaseOperation, DepotsLayer, DepotsData, LineMapLayer, LineMapData } from 'harmoware-vis';
import Controller from './Controller';


//const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN ? process.env.REACT_APP_MAPBOX_TOKEN : "";
const MAPBOX_TOKEN = 'pk.eyJ1IjoicnVpaGlyYW5vIiwiYSI6ImNrcmJybGN4dDBlcXYyb3BldDZoeWVyYW4ifQ.oTpS9j7y2COY6qvbPuCiWQ'

const depotsdata = [  // line source & target
    {
        "position": [136.978052, 35.152912, 0], // line start position (long,Lati,height)
    },
]

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

const linedata = [  // line source & target
    {
        "sourcePosition": [136.978052, 35.152912, 0], // line start position (long,Lati,height)
        "targetPosition": [136.981445, 35.157597, 0], // line end position (long,Lati,height)
    },
    {
        "sourcePosition": [136.979052, 35.152912, 0], // line start position (long,Lati,height)
        "targetPosition": [136.981445, 35.157597, 0], // line end position (long,Lati,height)
    },
    {
        "path": [[136.977052, 35.152912, 0], // line path position (long,Lati,height)
        [136.978052, 35.152912, 0]],
        "dash ": [5, 2], // line pattern
    },
    {
        "polygon": [[136.977052, 35.152812, 0], // polygon path position (long,Lati,height)
        [136.976052, 35.152912, 0], [136.975052, 35.152312, 0]],
        "elevation": 10, // 3-D object height
    },
    {
        "coordinates": [[136.977752, 35.152212, 0], // coordinates path position (long,Lati,height)
        [136.977852, 35.152512, 0]],
    },
]

/*const mockMovesData = [{
    "departuretime": 1626754053, "arrivaltime": 1626754152, "operation": [
        { "elapsedtime": 1626754053, "position": [136.906372, 35.181454, 0], "direction": 0 },
        { "elapsedtime": 1626754054, "position": [136.906387, 35.181454, 0], "direction": 89.99999567501865 },
        { "elapsedtime": 1626754055, "position": [136.906403, 35.181454, 0], "direction": 89.9999953986329 }
    ]
}]*/

const createMovesData = () => {
    const step = 100
    const moves_num = 100
    const time = Math.floor(new Date().getTime() / 1000)
    console.log("time", new Date(time * 1000), new Date().getTime())
    const data = []
    for (let k = 0; k < moves_num; k++) {
        const operation = []
        for (let i = 0; i < step; i++) {
            operation.push({
                elapsedtime: time + i,
                position: [136.979352 + getRandomArbitrary(0.0001, 0.001), 35.152922 + getRandomArbitrary(0.0001, 0.001), 0],
                color: [0, 255, 0],
            })

        }
        data.push({
            type: "bus",
            operation: operation
        })
    }
    console.log('data', data)
    return data
}

class Harmoware extends Container {
    render() {
        const { actions, depotsData, viewport, movesbase } = this.props;
        //console.log("test2", movesbase)
        return (<HarmowarePage {...this.props} />)
    }
}

const HarmowarePage = (props) => {
    const { actions, viewport, movesbase, movedData, routePaths, clickedObject } = props

    useEffect(() => {

        console.log("ver1.1.2", process.env);
        const data = createMovesData()
        console.log("data", data)
        actions.setMovesBase(data);

        if (actions) {
            actions.setViewport({
                ...props.viewport,
                longitude: 136.9831702,
                latitude: 35.1562909,
                width: window.screen.width,
                height: window.screen.height,
                zoom: 16
            })
            actions.setSecPerHour(3600);
            actions.setLeading(2)
            actions.setTrailing(5)

        }
    }, [])

    //console.log("render: ", viewport, actions)
    return (
        <div className="harmovis_area">
            <Controller {...props} />
            <HarmoVisLayers
                viewport={viewport}
                actions={actions}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                layers={[
                    new LineMapLayer({
                        data: linedata,
                    }),
                    new DepotsLayer({
                        depotsData: depotsdata,
                    }),
                    new MovesLayer({
                        routePaths,
                        movesbase,
                        movedData,
                        clickedObject,
                        actions,
                        optionVisible: false,
                        //lightSettings,
                        //layerRadiusScale: 0.1,
                        getRadius: x => 0.5,
                        //getRouteWidth: x => 1,
                        //optionCellSize: 2,
                        //sizeScale: 1,
                        iconChange: true,
                        //optionChange: false, // this.state.optionChange,
                        //onHover
                    })
                ]}
            />
        </div>
    );
}

export default connectToHarmowareVis(Harmoware);