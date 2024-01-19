import { observer } from "mobx-react-lite";
import { Facebook_Creatives_Set_Input } from "../../../../gql/graphql";
import { useContext, useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ProjectFacebookCreativesContext } from "../../../../stores/stores";
import { Themes_Angles as ThemeAngle } from "../../../../gql/graphql";
import _ from "lodash";
import { ProjectStepChildProps } from "../../ProjectStepContainer";
const CopyEditModal = observer(({ angle, props }: { props: ProjectStepChildProps, angle: ThemeAngle }) => {
  const [creative] = useState(angle?.facebook_creatives[0])
  const [copy, setCopy] = useState(creative?.data.mainCopy)
  const [skip, setSkip] = useState(true)
  const facebookCreativeStore = useContext(ProjectFacebookCreativesContext)
  const updateFacebookCreativeMutation = useMutation({
    mutationKey: ['updateFacebookCreative'],
    mutationFn: () => facebookCreativeStore.updateProjectFacebookCreativeByPk({ creativeId: creative.id, facebookCreativeUpdate: { data: { ...creative.data, mainCopy: copy } } as Facebook_Creatives_Set_Input }),
    onSuccess: () => { if (props.saveProject) props.saveProject({}) }
  })

  const saveCopy = useMemo(() => _.debounce(() => updateFacebookCreativeMutation.mutate(), 500), [])

  useEffect(() => {
    if (!skip) {
      saveCopy()
    }
    setSkip(false)
  }, [copy])

  return (

    <textarea className="textarea w-full my-4" value={copy} onChange={(e) => setCopy(e.target.value)} />
  )
})

export default CopyEditModal