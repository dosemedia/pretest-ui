import { observer } from "mobx-react-lite";
import '../../../../css/creative.css'
import { useContext, useEffect, useState } from "react";
import { ProjectStatus, testTypeMenu } from "../../../../stores/projects";
import _ from 'lodash'
import { Facebook_Audiences as FacebookAudience } from "../../../../gql/graphql";
import { useMutation } from "@tanstack/react-query";
import { AuthContext, ProjectFacebookAudienceContext, ProjectLandingPagesContext, ThemesContext } from "../../../../stores/stores";
import FacebookPreviewContainer from "../../../social/FacebookPreviewContainer";
import { Projects_Themes as ProjectTheme } from "../../../../gql/graphql";
import { DateTime } from "luxon";
import { Landing_Pages as LandingPage } from '../../../../gql/graphql';
import { ProjectStepChildProps } from "../../ProjectStepContainer";
import ProjectAdminReview from "./ProjectAdminReview";
const UserReview: React.FC<ProjectStepChildProps> = observer((props: ProjectStepChildProps) => {
  const facebookAudiencesStore = useContext(ProjectFacebookAudienceContext)
  const landingPagesStore = useContext(ProjectLandingPagesContext)
  const authStore =useContext(AuthContext)
  const projectThemesStore = useContext(ThemesContext)
  const [nameApproved, setNameApproved] = useState(props.project?.name_approved || false)
  const [objectiveApproved, setObjectiveApproved] = useState(props.project?.objective_approved || false)
  const [projectTypeApproved, setProjectTypeApproved] = useState(props.project?.project_type_approved || false)
  const [brandnessApproved, setBrandnessApproved] = useState(props.project?.brandness_approved || false)
  const [platformApproved, setPlatformApproved] = useState(props.project?.platform_approved || false)
  const [startStopTimeApproved, setStartStopTimeApproved] = useState(props.project?.start_stop_time_approved || false)
  function renderTags(list: string[]) {
    return (
      <div key={list.join(',')} className="flex gap-x-2">
        {
          list.map((item: string) => <div key={item} className="badge border-none rounded-sm" style={{ backgroundColor: 'rgba(184, 173, 134, 0.17)' }}>
            {item}
          </div>)
        }
      </div>
    )
  }

  const updateThemeMutation = useMutation({
    mutationKey: ['UpdateThemeMutation'],
    mutationFn: ({ id, approved }: { id: string, approved: boolean }) => projectThemesStore.updateTheme({ id, payload: { approved } as ProjectTheme }),
    onSuccess: () => { if (props.saveProject) props.saveProject({}) }
  })

  const updateLandingPageMutation = useMutation({
    mutationKey: ['UpdateLandingPageMutation'],
    mutationFn: ({ id, approved }: { id: string, approved: boolean }) => landingPagesStore.updateLandingPage(id, { approved } as LandingPage),
    onSuccess: () => { if (props.saveProject) props.saveProject({}) }
  })

  const updateFacebookAudiencesApprovalMutation = useMutation({
    mutationKey: ['UpdateFacebookAudiencesApprovalMutation'],
    mutationFn: ({ id, approved }: { id: string, approved: boolean }) => facebookAudiencesStore.updateFacebookAudiencesByID({ id, payload: { approved } as FacebookAudience }),
    onSuccess: () => { if (props.saveProject) props.saveProject({}) }
  })

  function isDisabled () {
    return props.project?.status === ProjectStatus.SUBMITTED || (props.project?.status === ProjectStatus.REVIEW && !authStore.superadmin)
  }

  useEffect(() => {
    if (props.saveProject) props.saveProject({ name_approved: nameApproved, brandness_approved: brandnessApproved, platform_approved: platformApproved, start_stop_time_approved: startStopTimeApproved, objective_approved: objectiveApproved, project_type_approved: projectTypeApproved })
  }, [nameApproved, brandnessApproved, platformApproved, startStopTimeApproved, objectiveApproved, projectTypeApproved])

  return (
    <>
      {props.project?.status === ProjectStatus.REVIEW && !authStore.superadmin ? <div>Congratulations! Your test has been sent off for review</div> :
        <div>
          { props.project?.status !== ProjectStatus.DRAFT && <ProjectAdminReview project={props.project} /> }
          {/* Name Approval */}
          <label className="label mb-1">
            <span className="text-sm opacity-60">Name of your test</span>
          </label>
          <div className="flex items-center gap-x-2">
            <input type="checkbox" className="checkbox checkbox-primary border-gray-200" disabled={isDisabled()} checked={nameApproved} onChange={() => setNameApproved((prev) => !prev)} />
            <span className="font-bold text-md">{props.project?.name}</span>
          </div>

          {/* Objective Approval */}
          <label className="label mb-1 mt-5">
            <span className="text-sm opacity-60">Goals for this test</span>
          </label>
          <div className="flex items-center gap-x-2">
            <input type="checkbox" className="checkbox checkbox-primary border-gray-200" disabled={isDisabled()} checked={objectiveApproved} onChange={() => setObjectiveApproved((prev) => !prev)} />
            <span className="font-bold text-md">{props.project?.objective}</span>
          </div>

          {/* Project Type Approval */}
          <label className="label mb-1 mt-5">
            <span className="text-sm opacity-60">Test type</span>
          </label>
          <div className="flex items-center gap-x-2">
            <input type="checkbox" className="checkbox checkbox-primary border-gray-200" disabled={isDisabled()} checked={projectTypeApproved} onChange={() => setProjectTypeApproved((prev) => !prev)} />
            <span className="font-bold text-md">{_.find(testTypeMenu, (item) => item.value === props.project?.project_type)?.label}</span>
          </div>

          {/* Brandness Approval */}
          <label className="label mb-1 mt-5">
            <span className="text-sm opacity-60">Brandedness</span>
          </label>
          <div className="flex items-center gap-x-2">
            <input type="checkbox" className="checkbox checkbox-primary border-gray-200" disabled={isDisabled()} checked={brandnessApproved} onChange={() => setBrandnessApproved((prev) => !prev)} />
            <span className="font-bold text-md">{props.project?.branding && (props.project?.branding.charAt(0).toUpperCase() + props.project?.branding.slice(1))}</span>
          </div>

          {/* Location Approval */}
          <label className="label mb-1 mt-5">
            <span className="text-sm opacity-60">Test Location</span>
          </label>
          <div className="flex items-center gap-x-2">
            <input type="checkbox" className="checkbox checkbox-primary border-gray-200" disabled={isDisabled()} checked={platformApproved} onChange={() => setPlatformApproved((prev) => !prev)} />
            <span className="font-bold text-md">{props.project?.platform?.split('_').join(' & ')}</span>
          </div>

          {/* Audience Approval */}
          <label className="label mb-1 mt-5">
            <span className="text-sm opacity-60">Audiences</span>
          </label>
          {props.project?.facebook_audiences.map((audience: FacebookAudience) =>
            <div key={audience.id}>
              <div className="flex items-center gap-x-2">
                <input type="checkbox" className="checkbox checkbox-primary border-gray-200" disabled={isDisabled()} checked={audience.approved || false} onChange={() => { updateFacebookAudiencesApprovalMutation.mutate({ id: audience.id, approved: !audience.approved }); audience.approved = !audience.approved }} />
                <span className="font-bold text-md">{audience.name}</span>
              </div>
              <div className="mt-3">
                {renderTags(audience.geo_locations['countries'])}
              </div>
              <div className="mt-3">
                {audience.genders && renderTags(audience.genders?.map((item) => item == 1 ? 'Male' : 'Female'))}
              </div>
              <div className="mt-3">
                {audience.min_age && audience.max_age && renderTags([`${audience.min_age.toString()}-${audience.max_age.toString()}`])}
              </div>
              <div className="mt-3">
                {audience.interests && renderTags(audience.interests.map((item: { name: string }) => item.name))}
              </div>
            </div>
          )
          }

          {/* Duration Approval */}
          <label className="label mb-1 mt-5">
            <span className="text-sm opacity-60">Set duration</span>
          </label>
          <div className="flex items-center gap-x-2">
            <input type="checkbox" className="checkbox checkbox-primary border-gray-200" disabled={isDisabled()} checked={startStopTimeApproved} onChange={() => setStartStopTimeApproved((prev) => !prev)} />
            <span className="font-bold text-md">{DateTime.fromISO(props.project?.stop_time).diff(DateTime.fromISO(props.project?.start_time)).as('days')} days</span>
          </div>

          {/* Creative Approval */}
          <label className="label mb-1 mt-5">
            <span className="text-sm opacity-60">Creatives</span>
          </label>
          <div className="flex flex-col gap-y-12">
            {props.project?.themes.map((theme) =>
              <div key={theme.id}>
                <div className="flex items-center gap-x-2">
                  <input type="checkbox" className="checkbox checkbox-primary border-gray-200" disabled={isDisabled()} checked={theme.approved || false} onChange={() => { updateThemeMutation.mutate({ id: theme.id, approved: !theme.approved }); theme.approved = !theme.approved }} />
                  <span className="font-bold text-md">{theme.name}</span>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-2 mt-3">
                  {theme.angles.map((angle) => <div key={angle.id} className="w-[340px]">
                    <FacebookPreviewContainer editTemplate={false} socialCopy={angle.facebook_creatives[0].social_copy || ''} data={angle.facebook_creatives[0].data} ctaText={angle.facebook_creatives[0].cta_text || ''} ctaType={angle.facebook_creatives[0].cta_type || ''} template={angle.facebook_creatives[0]} />
                  </div>)}
                </div>
              </div>)}
          </div>

          {/* Landing Page Approval */}
          <label className="label mb-1 mt-5">
            <span className="text-sm opacity-60">Landing Pages</span>
          </label>
          <div className="flex flex-col gap-y-3">
            {props.project?.landing_pages.map((page) =>
              <div key={page.id}>
                <div className="flex items-center gap-x-2">
                  <input type="checkbox" className="checkbox checkbox-primary border-gray-200" disabled={isDisabled()} checked={page.approved || false} onChange={() => { updateLandingPageMutation.mutate({ id: page.id, approved: !page.approved }); page.approved = !page.approved }} />
                  <span className="font-bold text-md">{page.template_name}</span>
                </div>
              </div>)}
          </div>
        </div>
      }
    </>
  )
})

export default UserReview