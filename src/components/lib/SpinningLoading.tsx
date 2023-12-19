import _ from 'lodash'
export const SpinningLoading: React.FC<{ isLoading: boolean | boolean[], size?: string }> = ({ isLoading = false, size='loading-xs' }) => {
  return (
    <>
      { (typeof isLoading === 'boolean' ? isLoading : _.find(isLoading, (item) => item === true) === true) && <span className={`loading ${size}`}></span> }
    </>
  )
}