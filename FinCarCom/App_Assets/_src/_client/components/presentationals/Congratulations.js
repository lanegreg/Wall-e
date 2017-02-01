
import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import Radium from 'radium'
import { MainContentWrap } from '../'
// import action from '../../actions'
// import styles from '../styles/congratulations'


const Congratulations = ({
  children,
  supertitle,
  title,
  subtitle
}) => {


  return (
    <MainContentWrap
      children={children} supertitle={supertitle}
      title={title} subtitle={subtitle}>

      <div className="container body-content">
        <div className="ck-container">
          <img src="/img/credit-karma.png" alt="Credit Karma logo"></img>
        </div>

        <div className="aw-listview-container">
          <p className="line-on-sides">We found these deals just for you.</p>
          <ul className="aw-listview">

            <li className="aw-listview-item">
              <a href="#">
                <div className="aw-thumb">
                  <img src="http://img.autobytel.com/2016/infiniti/qx80/2-800-oemexteriorfront1300-78124.jpg"
                    alt="" style="background: #ccc" />
                </div>
                <div className="aw-content">
                  <p className="header">Looking for a Jeep Wrangler in Costa Mesa?</p>
                  <span className="link">www.cerritosdodge.com</span>
                  <p className="copy">Cerritos Crysler Dodge RAM offers Deals on the Wrangler. <br />Click Here and See Why Customers Love Us</p>
                </div>
              </a>
            </li>

            <li className="aw-listview-item">
              <a href="#">
                <div className="aw-thumb">
                  <img src="http://img.autobytel.com/car-reviews/autobytel/127816-2015-infiniti-qx80-luxury-suv-review/2015-Infiniti-QX80-02.JPG"
                    alt="" style="background: #ccc" />
                </div>
                <div className="aw-content">
                  <p className="header">Save Up to Thousands off MSRP on New Jeep Wrangler</p>
                  <span className="link">www.edmunds.com</span>
                  <p className="copy">Find Wrangler Listings Near you <br />With Edmunds.com, Discover Jeep Deals in Your Area</p>
                </div>
              </a>
            </li>

            <li className="aw-listview-item">
              <a href="#">
                <div className="aw-thumb">
                  <img src="http://img.autobytel.com/2016/ford/explorer/2-800-oemexteriorfront1300-76780.jpg"
                    alt="" style="background: #ccc" />
                </div>
                <div className="aw-content">
                  <p className="header">Attention Costa Mesa! The New Jeep Wrangler is In!</p>
                  <span className="link">www.autoweb.com</span>
                  <p className="copy">Click here for 92647 deals near you! <br />We have what you're looking for!</p>
                </div>
              </a>
            </li>

          </ul>
        </div>
      </div>
    </MainContentWrap>
  )
}

Congratulations.propTypes = {
  supertitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string
}


export default connect()(Radium(Congratulations))
