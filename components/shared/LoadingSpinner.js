import SyncLoader from 'react-spinners/SyncLoader'
import { css } from '@emotion/react'

const override = css`
  margin-left: 44%;
  margin-right: 44%;
`

const LoadingSpinner = () => (
  <div className="my-5 py-5 d-block w-100">
    <SyncLoader css={override} size={8} color="#539dc2" />
  </div>
)

export default LoadingSpinner