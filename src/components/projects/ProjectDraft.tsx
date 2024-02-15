import TestObjective from "./test_components/configuration/TestObjective";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import '../../css/project_draft.css'
import ProjectStepContainer from "./ProjectStepContainer";
import TestPlatform from "./test_components/configuration/TestPlatform";
import TestBranding from "./test_components/configuration/TestBranding";
import TestRuntime from "./test_components/configuration/TestRuntime";
import TestCreatives from "./test_components/creative/TestCreatives";
import ProjectFacebookCreativeTemplateDetail from "./test_components/creative/ProjectFacebookCreativeTemplateDetail";
import TestThemes from "./test_components/creative/TestThemes";
import TestLandingPages from "./test_components/creative/TestLandingPages";
import TestMatrix from "./test_components/creative/TestMatrix";
import TestMatrixEditor from "./test_components/creative/TestMatrixEditor";
import UserReview from "./test_components/review/UserReview";
import UserPublish from "./test_components/publish/UserPublish";
import LandingPageDetail from "./test_components/creative/LandingPageDetail";
import TestAudienceContainer from "./test_components/configuration/TestAudienceContainer";
export interface NextButtonConfig {
  name: string,
  onNext: () => void
}

export interface ProjectDraftMenu {
  label: string,
  value: string,
  icon: string,
  disabled?: boolean,
  steps?: number[],
  overrideNext?: NextButtonConfig | null,
  goToStep?: () => number,
  isComplete?: boolean,
  children?: ProjectDraftMenu[]
}

const ProjectDraft = () => {
  const searchParams = useSearchParams()[0]
  const location = useLocation();
  const [step, setStep] = useState(parseInt(searchParams.get('step') || '1'))
  useEffect(() => {
    const stepParam = searchParams.get('step')
    if (stepParam) {
      setStep(parseInt(stepParam))
    }
  }, [location])
  return (
    <>
      <ProjectStepContainer step={step}>
        <TestObjective title="what kind of test do you want to run?" />
        <TestBranding title="do you want to include your company's branding?" />
        <TestPlatform title="where would you like to test?" />
        <TestAudienceContainer title="build an audience" />
        <TestRuntime title="how long do you want your test to run?" />
        <TestCreatives title="select an ad style" />
        <ProjectFacebookCreativeTemplateDetail title="edit/remove your template below" />
        <TestThemes title="which theme(s) helps answer your big question?" />
        <TestMatrix title="create your theme messaging" />
        <TestMatrixEditor title="create your test structure" />
        <TestLandingPages title="build your landing page" />
        <LandingPageDetail />
        <UserReview title="review your test" />
        <UserPublish title="your test is in the queue" />
      </ProjectStepContainer>
    </>
  )
}

export default ProjectDraft