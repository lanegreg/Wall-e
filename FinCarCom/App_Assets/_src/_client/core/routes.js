
import React from 'react' // eslint-disable-line no-unused-vars
import { Route } from 'react-router'
import {
  App, Prequalify, AnnualIncome, SocialSecurity,
  ContactName, ContactEmail, Phones,
  ResidenceAddress, ResidenceType, ResidenceTime,
  ResidenceCost, Employment, EmploymentTime, WorkPhone,
  DateOfBirth, CreditRating,
  VehicleMakeModel, VehicleYearMileage,
  Congratulations, NoQualify
} from '../components'


const routes = (
  <Route path='/' component={App}>
    <Route path='prequalify' component={Prequalify} />
    <Route path='annual-income' component={AnnualIncome} />
    <Route path='vehicle-year-mileage' component={VehicleYearMileage} />
    <Route path='vehicle-make-model' component={VehicleMakeModel} />
    <Route path='social-security' component={SocialSecurity} />
    <Route path='credit-rating' component={CreditRating} />
    <Route path='contact-name' component={ContactName} />
    <Route path='contact-email' component={ContactEmail} />
    <Route path='contact-phone' component={Phones} />
    <Route path='residence-address' component={ResidenceAddress} />
    <Route path='residence-type' component={ResidenceType} />
    <Route path='residence-time' component={ResidenceTime} />
    <Route path='residence-cost' component={ResidenceCost} />
    <Route path='employer' component={Employment} />
    <Route path='employment-time' component={EmploymentTime} />
    <Route path='employment-phone' component={WorkPhone} />
    <Route path='date-of-birth' component={DateOfBirth} />
    <Route path='congratulations' component={Congratulations} />
    <Route path='no-qualify' component={NoQualify}
      onEnter={
        (nextState, replace, callback) => {
          const win = window
              , noQualify = win.CAR.NoQualify

          win.setTimeout(() => {
            win.location.href = noQualify.redirectUrl
          }, noQualify.redirectTtlms)

          callback()
        }
      }
    />
  </Route>
)


export default routes
