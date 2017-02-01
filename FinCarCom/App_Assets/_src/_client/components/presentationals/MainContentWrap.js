
import React from 'react' // eslint-disable-line no-unused-vars
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Radium from 'radium'
import styles from '../styles/maincontentwrap'


const MainContentWrap = ({ children, h1, h2, h3, h4 }) => {
  return (
    <main>
      <header style={styles.root}>
        <div style={styles.container}>
          {h1 && <h1 style={styles.h1}>{h1}</h1>}
          {h2 && <h2 style={styles.h2}>{h2}</h2>}
          {h3 && <h3 style={styles.h3}>{h3}</h3>}
          {h4 && <h4 style={styles.h4}>{h4}</h4>}
        </div>
      </header>
      <ReactCSSTransitionGroup
        transitionName="fcc"
        transitionAppear={true}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppearTimeout={800}
      >
        <div style={[styles.container, styles.content]}>
          {children}
        </div>
      </ReactCSSTransitionGroup>
    </main>
  )
}


export default Radium(MainContentWrap)
