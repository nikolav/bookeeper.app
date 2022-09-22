import { useEffect, useState } from "react";
import { feature, mesh } from "topojson-client";
import { 
  // geoEqualEarth, 
  geoNaturalEarth1, 
  geoPath, 
  geoGraticule,
} from "d3";
import { WORLD_ATLAS_COUNTRIES_50M } from "../../app/store";
import { useQueryResourceBase } from "../index";
// 
// const projection = geoEqualEarth();
const projection = geoNaturalEarth1();
const graticule = geoGraticule();
const geoDrawFeature = geoPath(projection);
// 
const useQueryWorldAtlas = () => {
  const [topology, setTopology] = useState(null)
  const [paths, setPaths] = useState({})
  // 
  const query = useQueryResourceBase(
    {
      key: "world-atlas-countries",
      url: WORLD_ATLAS_COUNTRIES_50M,
    });
  const { error, isLoading, data } = query;
  useEffect(() => {
    if (!isLoading && error) return;
    if (!isLoading && !error && data)
      setTopology(data);
  }, [error, isLoading, data]);
  // 
  useEffect(() => {
    if (topology) {
      const { countries, land } = topology.objects;
      setPaths({
        countries: feature(topology, countries),
        interiors: mesh(topology, countries, (a, b) => a !== b),
        land: feature(topology, land),
      });
    }
  }, [topology]);
  // 
  return {
    topology,
    paths,
    geoDrawFeature,
    graticule,
    query,
  }
}

export default useQueryWorldAtlas;


/*
<div>
  {
    (countries && interiors) && (
      <svg width="960" height="500" style={{ border: "1px dotted rgba(0,0,0,.2)" }}>
        <path fill="lightgray" stroke="none" d={geoDrawFeature({type: "Sphere"})} />
        <path fill="none" stroke="rgba(0,0,0,.045)" d={geoDrawFeature(graticule())} />
        {
          // countries.features.map((feature, i) => 
          //   <path stroke="none" key={i} d={geoDrawFeature(feature)} />)
          land.features.map((feature, i) => 
            <path fill="currentcolor" stroke="none" key={i} d={geoDrawFeature(feature)} />)
        }
        <path fill="none" stroke="gray" d={geoDrawFeature(interiors)} />
      </svg>
    )
  }
</div>
*/
