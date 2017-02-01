
import React from 'react' // eslint-disable-line no-unused-vars
import Radium from 'radium'


const ProgressBar = ({ styles, percent }) => {
  const title = `${percent}% done`

  return (
    <div style={styles.root}>
      <span>{title}</span>
      <div style={styles.bar}>
        <span
          style={[styles.progress, {width: `${percent}%`}]}
          title={title}></span>
      </div>
    </div>
  )
}


export default Radium(ProgressBar)
