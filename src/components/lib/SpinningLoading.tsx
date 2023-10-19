export const SpinningLoading: React.FC<{ isLoading: boolean }> = ({ isLoading = false }) => {
  return (
    <>
      { isLoading && <span className="loading loading-spinner"></span> }
    </>
  )
}