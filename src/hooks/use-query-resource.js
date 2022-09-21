import { useState, useEffect } from "react"
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { stripEndSlashes, isString } from "../util";
import { API_URL, REST_RESOURCE_main } from "../app/store";
//
export const DEFAULT_QUERY_CONFIG = {
  // refresh data on every window focus
  refetchOnWindowFocus: true,
  //   refetchOnMount: bool,
  //   refetchOnReconnect: bool,

  // how oftern to refetch data
  staleTime: 122333, // [0], `Infinity`: fresh forever, refetch manually

  // ttl for cached/hiden query for memcached data thats not displaying
  cacheTime: 12 * 60 * 1000, // in ms; `Infinity` doesnt gc queries

  // how many times to retry failed query
  retry: false, // number | boolean | 0 [3]
  // retryDelay: number [sec] | func

  //  enable dependent queries;
  //    allow query to run after prev. data has been fetched
  //  run q query if other data is available
  //  dependent queries start in .isIdle state
  enabled: true,

  // use existing query data seed
  // initialData: any,
  // ..start with exisiting cache if any;
  // @deprecated
  // initialData: () => qCache.findAll(ARTICLES),
  // show initial data but fetch on component mount
  initialStale: true,

  //   • access RQ cache
  //   queryCache {
  //   .getQueryData(query: string): data[]
  //   .setQueryData(key: [string, data-ID], data: object)
  //   .invalidateQueries(key: string|array, [opts])
  //     // with .refetchActive=true opt: mark queries as stale for next refetch
  //   preload data imperatively wihout any user actions taken,
  //   populate cache with some predicted/popular data to show,
  //     or .onHover to populate page data
  //   .prefetchQuery([key,id], fetcher: ()=>void, [opts]); can take options same as .useQuery
  // }

  // poll interval [ms]
  refetchInterval: 67890,
  //
  //  onSuccess: (data) => null,
  //  onError: (error) => null,
  //  onSettled: (data, error) => null,

  // prepopulate its cache if empty
  // with placeholder, partial or incomplete data
  // it doesnt cache this data like .initialData
  // .. can pass memozed function to calc. data upfront
  // .placeholderData
};
//
//
export function useQueryResource(RESOURCE, config = {}) {
  const queryClient = useQueryClient();
  // .invalidateQueries(<key>)
  // .prefetchQuery(<key>, <fetch>)
  // .setQueryData(<key>, <data>)
  // .getQueryData(<key>)
  //
  return useQuery(
    RESOURCE,
    (_key) =>
      axios
        .get(`${stripEndSlashes(API_URL)}/${RESOURCE}`)
        .then(({ data }) => data),
    {
      ...DEFAULT_QUERY_CONFIG,
      initialData: () => queryClient.getQueryData(RESOURCE),
      ...config,
    }
  );
}
//
export function useQueryResourceBase(resource, config = {}) {
  // resource: { key: string.unique | string[], url: string.url } | string
  const queryClient = useQueryClient();
  if (isString(resource)) resource = { key: resource, url: resource };
  //
  return useQuery(
    resource.key,
    (_key) => axios.get(resource.url).then(({ data }) => data),
    {
      ...DEFAULT_QUERY_CONFIG,
      initialData: () => queryClient.getQueryData(resource.key),
      ...config,
    }
  );
}
//
export function useQueryResourceCustom(
  queryFunction,
  _prefix = null,
  config = {}
) {
  const [keys$, setk] = useState([]);
  const queryClient = useQueryClient();
  //
  const keys_ = null != _prefix ? [_prefix, ...keys$] : keys$;
  const query = useQuery(keys_, queryFunction, {
    ...DEFAULT_QUERY_CONFIG,
    initialData: () => queryClient.getQueryData(keys_),
    ...config,
  });
  //
  return {
    fetch: setk,
    query,
  };
  //
}
////
////
export function useQueryMain(config) {
  return useQueryResource(REST_RESOURCE_main, config);
}
