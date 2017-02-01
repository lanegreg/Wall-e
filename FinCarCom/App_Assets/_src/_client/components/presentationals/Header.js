
import React from 'react' // eslint-disable-line no-unused-vars
import Radium from 'radium'
import { ProgressBar } from '../'
import styles from '../styles/header'

const Header = ({ onPrevPage, percent, suppressBackNavAndProgressBar }) => {
  const onBackClick = e => {
    e.preventDefault()
    onPrevPage()
  }

  return (
    <header style={styles.root}>
      <div style={styles.container}>
        <span style={styles.logoIco}>
            <svg style={styles.svg}>
              <use xlinkHref="#logo"></use>
            </svg>
        </span>
      </div>
      {!suppressBackNavAndProgressBar && (
        <span style={styles.backArrowIco}>
          <a href="#" onClick={onBackClick.bind(this)}>
            <svg style={styles.svg}>
              <use xlinkHref="#back_arrow"></use>
            </svg>
          </a>
        </span>
      )}
      {!suppressBackNavAndProgressBar && (
        <ProgressBar styles={styles.progressBar} percent={percent} />
      )}
    </header>
  )
}


export default Radium(Header)
