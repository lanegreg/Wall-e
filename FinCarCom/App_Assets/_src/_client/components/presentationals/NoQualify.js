
import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars
import Radium from 'radium'
import { MainContentWrap } from '../'


const NoQualify = ({
  children,
  h1,
  h2,
  h3,
  h4
}) => {


  return (
    <MainContentWrap
      children={children} h1={h1}
      h2={h2} h3={h3} h4={h4}>
    </MainContentWrap>
  )
}

NoQualify.propTypes = {
  h1: PropTypes.string,
  h2: PropTypes.string,
  h3: PropTypes.string,
  h4: PropTypes.string
}



export default Radium(NoQualify)
