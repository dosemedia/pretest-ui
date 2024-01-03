import { useContext, useEffect } from "react"
import { Projects as Project } from "../../gql/graphql"
import ProjectStatusView from "../lib/ProjectStatus"
import { AuthContext, ProjectsContext } from "../../stores/stores"
import FileUploader, { ProjectBucketUpload } from "../lib/FileUpload"
import { useMutation, useQuery } from "@tanstack/react-query"
import { SpinningLoading } from "../lib/SpinningLoading"
function DownloadReportModal({ element_id, projectId }: { element_id: string, projectId: string | undefined }) {
  const authStore = useContext(AuthContext)
  const projectStore = useContext(ProjectsContext)
  const { data: project, isLoading, refetch } = useQuery({
    queryKey: ['project'],
    queryFn: () => { if (projectId) { return projectStore.fetchProject({ projectId }) } return null }
  })
  const updateProjectMutation = useMutation({
    mutationKey: ['updateProject'],
    mutationFn: ({ final_report_upload_url }: { final_report_upload_url: string | null }) => projectStore.updateProject({ id: project?.id, payload: { final_report_upload_url } as Project }),
    onSuccess: () => { refetch() }
  })
  useEffect(() => {
    refetch()
  }, [projectId])
  return (
    <>
      <dialog id={element_id} className="modal">
        <div className="modal-box">
          {isLoading && <SpinningLoading isLoading={isLoading} />}
          {!isLoading && project &&
            <div>
              <ProjectStatusView project={project} />
              <p className="text-lg font-bold my-6">
                {project?.name}
              </p>
              {authStore.isSuperadmin() && <div>
                <div className="text-sm opacity-60">Upload Final Report Here</div>
                <FileUploader uploader={new ProjectBucketUpload({ projectId: project.id, folder: 'report', filePath: authStore.filesBaseUrl + '/files/project-assets', multerFieldName: 'project_assets' })} onUpload={(e) => updateProjectMutation.mutate({ final_report_upload_url: e })} accept=".pptx" />
              </div>}
              {
                authStore.isSuperadmin() && project.final_report_upload_url && <button className="btn btn-primary mr-3 normal-case" onClick={() => updateProjectMutation.mutate({ final_report_upload_url: null })}>Remove Report</button>
              }
              {
                project.final_report_upload_url && <a className="btn gradient-background text-white normal-case mt-6" href={project.final_report_upload_url}>Download Final Report</a>
              }
            </div>
          }
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}

export default DownloadReportModal