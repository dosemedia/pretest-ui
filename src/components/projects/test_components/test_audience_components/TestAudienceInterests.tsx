import { observer } from "mobx-react-lite";
import { useContext, useEffect, useMemo, useState } from "react";
import { FacebookContext } from "../../../../stores/stores";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { Facebook_Audiences as FacebookAudience } from "../../../../gql/graphql";
import { SpinningLoading } from "../../../lib/SpinningLoading";
import { FacebookAudienceInterest } from "../../../../stores/facebook";

const TestAudienceInterests = observer(({ onUpdate, projectFacebookAudience }: { onUpdate: (audience: FacebookAudience, isUpdated: boolean) => void, projectFacebookAudience: FacebookAudience }) => {
  const facebookStore = useContext(FacebookContext)
  const [search, setSearch] = useState('')
  const [isUpdated, setIsUpdated] = useState(false)
  const [interests, setInterests] = useState<FacebookAudienceInterest[]>([])
  const [selectedInterest, setSelectedInterest] = useState<FacebookAudienceInterest | null>()
  const { data: facebookInterestsMutation, isLoading, isRefetching, refetch: facebookInterestsRefetch } = useQuery({
    queryKey: ['facebookInterests'],
    retry: false,
    queryFn: async () => {
      const result: FacebookAudienceInterest[] = await facebookStore.getInterests({ search })
      if (result && result.length > 0) {
        setSelectedInterest(result[0])
      }
      return result
    }
  })
  const onSearch = useMemo(() => _.debounce((value: string) => {
    if (value) {
      facebookInterestsRefetch()
    }
  }, 1000), [])

  function addInterest() {
    const interest = selectedInterest as FacebookAudienceInterest
    if (interest) {
      if (interest && !_.find(interests, (item) => item.id === selectedInterest!.id)) {
        setInterests((prev) => [...prev, { name: interest.name, id: interest.id }])
      }
      setSearch('')
      setIsUpdated(true)
    }
  }

  function removeInterest(id: number) {
    const list = _.filter(interests, (item) => item.id !== id)
    setInterests(list)
    setIsUpdated(true)
  }

  useEffect(() => {
    if (!search) {
      facebookInterestsRefetch()
    }
  }, [search])

  useEffect(() => {
    if (projectFacebookAudience.interests) {
      setInterests(projectFacebookAudience.interests)
    }
  }, [projectFacebookAudience])

  useEffect(() => {
    onUpdate({ interests } as FacebookAudience, isUpdated)
  }, [interests])


  // function formatLocations() {
  //   const formattedLocations = {
  //     countries: [] as string[],
  //     regions: {} as Record<Exclude<string, "known" | "field">, string | object>
  //   }
  //   for (const location of locations) {
  //     if (location.type === 'country' && !formattedLocations['countries'].includes(location.country_code)) {
  //       formattedLocations['countries'].push(location.key)
  //     } else if (location.type === 'region' && !formattedLocations['regions'][location.key]) {
  //       formattedLocations['regions'][location.key] = { key: location.key, name: location.name }
  //     }
  //   }
  //   return formattedLocations
  // }

  return (
    <div>
      <div className="form-control">
        <label className="label">
          <span className="text-sm opacity-60">Interests</span>
        </label>
        <div className="flex items-center">
          <input type="text" className="input" placeholder="Search for interests..." value={search} onChange={(e) => { setSearch(e.target.value); onSearch(e?.target.value) }} />
          <div className="ml-2">
            {isLoading || isRefetching && <SpinningLoading isLoading={isLoading || isRefetching} size='lg' />}
            {facebookInterestsMutation && facebookInterestsMutation.length > 0 && search && !isLoading && !isRefetching &&
              <div className="flex gap-x-2">
                <select className="select select-bordered w-full max-w-xs" onChange={(e) => setSelectedInterest(JSON.parse(e.target.value))}>
                  {facebookInterestsMutation.filter((item) => !interests.map((loc) => loc.id).includes(item.id)).map((item) => <option key={item.id} value={JSON.stringify(item)} >{item.name}</option>)}
                </select>
                <button className="btn normal-case bg-blue-600 text-white border-none" onClick={() => addInterest()}>Add</button>
              </div>
            }
          </div>
        </div>
        <div className="flex gap-x-2 mt-3">
          {interests.map((item) => (
            <div style={{ backgroundColor: 'rgba(184, 173, 134, 0.17)' }} key={item.id} className="badge rounded-md p-3 cursor-pointer" onClick={() => removeInterest(item.id)}>{item.name}<span className="mdi mdi-close ml-2" /></div>
          )
          )}
        </div>
      </div>
    </div>
  )
})

export default TestAudienceInterests