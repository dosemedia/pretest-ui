export const SpinningLoading: React.FC<{ isLoading: boolean, size?: string }> = ({ isLoading = false, size='loading-xs' }) => {
  return (
    <>
      { isLoading && <span className={`loading ${size}`}></span> }
    </>
  )
}