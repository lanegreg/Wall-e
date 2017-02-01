
import React, { Component, PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Radium, { StyleRoot } from 'radium'
import { Header, Footer } from '../'
import action from '../../actions'
import styles from '../styles/app'
import { getCurrentPage } from '../../api/service'



class App extends Component {
  constructor(props) {
    super(props)
  }


  componentWillReceiveProps({ initting, initted, location, mode, pages, pageIdx }) {
    const pageToTransitionTo = getCurrentPage({ mode, pages, pageIdx })

    if(initted && !initting && pageToTransitionTo) {
      if(pageToTransitionTo.url !== location.pathname) {
        browserHistory.push(pageToTransitionTo.url)
      }
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(action.initAppIfNecessary())
    dispatch(action.initOverlayContentIfNecessary())
  }


  render() {
    const { dispatch, children, mode, pages, pageIdx } = this.props
        , thisPage = getCurrentPage({ mode, pages, pageIdx })
        , isTheFirstPage = pageIdx === 0
        , percent = Math.round((pageIdx + 1) / pages.length * 100)

    return (
      <StyleRoot style={styles.root}>
        <Header percent={percent}
          suppressBackNavAndProgressBar={isTheFirstPage}
          onPrevPage={() => dispatch(action.gotoPrevPage())} />
        {
          React.cloneElement(children, {
            ...thisPage,
            onNextPage: () => dispatch(action.gotoNextPage())
          })
        }
        <Footer year={(new Date).getFullYear()}/>
      </StyleRoot>
    )
  }
}

App.propTypes = {
  initting: PropTypes.bool.isRequired,
  initted: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  pages: PropTypes.array.isRequired,
  pageIdx: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
}


function mapStateToProps({ app: { mode, pages, pageIdx, data: { initting, initted } } }) {
  return { initting, initted, mode, pages, pageIdx }
}


export default Radium(connect(mapStateToProps)(App))
