export const SpinningLoading: React.FC<{ isLoading: boolean, size?: string }> = ({ isLoading = false, size='xs' }) => {
  return (
    <>
      { isLoading && <span className={`loading loading-${size}`}></span> }
    </>
  )
}