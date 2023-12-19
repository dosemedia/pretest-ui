import { observer } from "mobx-react-lite";
import { useContext, useEffect, useMemo, useState } from "react";
import { FacebookContext } from "../../../../stores/stores";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { FacebookAudienceGeolocation } from "../../../../stores/facebook";
import { SpinningLoading } from "../../../lib/SpinningLoading";
import { Facebook_Audiences as FacebookAudience } from "../../../../gql/graphql";
import { ProjectFacebookAudienceGeolocation } from "../../../../stores/project_facebook_audience";

const TestAudienceLocations = observer(({ onUpdate, projectFacebookAudience, disabled }: { onUpdate: (audience: FacebookAudience, isUpdated: boolean) => void, projectFacebookAudience: FacebookAudience, disabled: boolean }) => {
  const facebookStore = useContext(FacebookContext)
  const [locationSearch, setLocationSearch] = useState('')
  const [isUpdated, setIsUpdated] = useState(false)
  const [locations, setLocations] = useState<FacebookAudienceGeolocation[]>([])
  const [selectedLocation, setSelectedLocation] = useState<FacebookAudienceGeolocation | null>()
  const { data: projectFacebookAudienceData } = useQuery({
    queryKey: ['fetchFacebookLocationDataByKeys'],
    retry: false,
    queryFn: () =>  facebookStore.getAudienceLocationsByKeys({ geo_locations: projectFacebookAudience.geo_locations as ProjectFacebookAudienceGeolocation })
  })
  const { data: facebookLocations, refetch, isLoading: facebookLocationsIsLoading, isRefetching: facebookLocationsIsRefetching } = useQuery({
    queryKey: ['facebookLocations'],
    queryFn: async () => { 
      const result = await facebookStore.getAudienceLocationsBySearch({ search: locationSearch })
      setSelectedLocation(result[0])
      return result
    }
  })
  const onLocationSearch = useMemo(() => _.debounce((value: string) => {
    if (value) {
      refetch()
    }
  }, 1000), [])
  function addLocation() {
    if (selectedLocation) {
      setLocations((prev) => [...prev, selectedLocation])
    }
    setLocationSearch('')
    setIsUpdated(true)
  }

  function updateLocations() {
    const formattedLocations = formatLocations()
    onUpdate({ geo_locations: formattedLocations as ProjectFacebookAudienceGeolocation } as FacebookAudience, isUpdated)
  }

  function removeLocation(value: FacebookAudienceGeolocation) {
    const list = _.filter(locations, (item) => item.name !== value.name)
    setLocations(list)
    setIsUpdated(true)
  }

  useEffect(() => {
    if (projectFacebookAudienceData) {
      setLocations(projectFacebookAudienceData)
    }
  }, [projectFacebookAudienceData])

  useEffect(() => {
    updateLocations()
  }, [locations])


  function formatLocations() {
    const formattedLocations = {
      countries: [] as string[],
      regions: {} as Record<Exclude<string, "known" | "field">, string | object>
    }
    for (const location of locations) {
      if (location.type === 'country' && !formattedLocations['countries'].includes(location.country_code)) {
        formattedLocations['countries'].push(location.key)
      } else if (location.type === 'region' && !formattedLocations['regions'][location.key]) {
        formattedLocations['regions'][location.key] = { key: location.key, name: location.name }
      }
    }
    return formattedLocations
  }

  return (
    <div>
      <div className="form-control">
        <label className="label">
          <span className="text-sm opacity-60">Location*</span>
        </label>
        <div className="flex items-center">
          <input disabled={disabled} type="text" className="input w-10/12" placeholder="Search for location..." value={locationSearch} onChange={(e) => { setLocationSearch(e.target.value); onLocationSearch(e?.target.value) }} />
          <div className="ml-2">
            {(facebookLocationsIsLoading || facebookLocationsIsRefetching) && <SpinningLoading isLoading={facebookLocationsIsLoading || facebookLocationsIsRefetching} size='loading-lg' />}
            {facebookLocations && facebookLocations.length > 0 && locationSearch && !facebookLocationsIsLoading && !facebookLocationsIsRefetching &&
              <div className="flex gap-x-2">
                <select className="select select-bordered w-full max-w-xs" onChange={(e) => setSelectedLocation(JSON.parse(e.target.value))}>
                  {facebookLocations.filter((item) => !locations.map((loc) => loc.key).includes(item.key)).map((item) => <option key={item.key} value={JSON.stringify(item)} >{item.name} ({item.type})</option>)}
                </select>
                <button className="btn normal-case bg-blue-600 text-white border-none" onClick={() => addLocation()}>Add</button>
              </div>
            }
          </div>
        </div>
        <div className="flex gap-x-2 mt-3">
          {locations.map((item) => (
            <div style={{ backgroundColor: 'rgba(184, 173, 134, 0.17)' }} key={item.key} className={`badge rounded-md p-3 cursor-pointer ${disabled && 'pointer-events-none'}`} onClick={() => removeLocation(item)}>{item.name}<span className="mdi mdi-close ml-2" /></div>
          )
          )}
        </div>
      </div>
    </div>
  )
})
export default TestAudienceLocations