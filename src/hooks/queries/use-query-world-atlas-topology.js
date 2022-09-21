import { useEffect, useState } from "react";
import { feature } from "topojson-client";
import { WORLD_ATLAS_COUNTRIES_50M } from "../../app/store";
import { useQueryResourceBase } from "../index";
// 
const useQueryWorldAtlasTopology = () => {
  const [resource, setResource] = useState(null)
  const [countries, setCountries] = useState(null)
  const query = useQueryResourceBase(
    {
      key: "world-atlas-countries",
      url: WORLD_ATLAS_COUNTRIES_50M,
    });
  const { error, isLoading, data } = query;
  useEffect(() => {
    if (!isLoading && error) return;
    if (!isLoading && !error && data)
      setResource(data);
  }, [error, isLoading, data])
  useEffect(() => {
    if (resource)
      setCountries(feature(resource, resource.objects.countries));
  }, [resource]);
  // 
  return {
    resource,
    countries,
    query,
  }
}

export default useQueryWorldAtlasTopology;
