
const base = 'fin.car.com/lead/'
    , UPDATE_ID = `${base}UPDATE_ID`
    , UPDATE_SESSION_ID = `${base}UPDATE_SESSION_ID`
    , UPDATE_INCOME = `${base}UPDATE_INCOME`
    , UPDATE_CREDIT_RATING_ID = `${base}UPDATE_CREDIT_RATING_ID`
    , UPDATE_FIRST_NAME = `${base}UPDATE_FIRST_NAME`
    , UPDATE_LAST_NAME = `${base}UPDATE_LAST_NAME`
    , UPDATE_EMAIL = `${base}UPDATE_EMAIL`
    , UPDATE_MOBILE_PHONE = `${base}UPDATE_MOBILE_PHONE`
    , UPDATE_HOME_PHONE = `${base}UPDATE_HOME_PHONE`
    , UPDATE_ADDRESS = `${base}UPDATE_ADDRESS`
    , UPDATE_CITY_STATE_ZIP = `${base}UPDATE_CITY_STATE_ZIP`
    , UPDATE_RESIDENCE_TYPE_ID = `${base}UPDATE_RESIDENCE_TYPE_ID`
    , UPDATE_RESIDENCE_TIME = `${base}UPDATE_RESIDENCE_TIME`
    , UPDATE_RESIDENCE_COST = `${base}UPDATE_RESIDENCE_COST`
    , UPDATE_EMPLOYER = `${base}UPDATE_EMPLOYER`
    , UPDATE_EMPLOYMENT_TIME = `${base}UPDATE_EMPLOYMENT_TIME`
    , UPDATE_WORK_PHONE = `${base}UPDATE_WORK_PHONE`
    , UPDATE_JOB_TITLE = `${base}UPDATE_JOB_TITLE`
    , UPDATE_DATE_OF_BIRTH = `${base}UPDATE_DATE_OF_BIRTH`
    , UPDATE_SOCIAL_SECURITY = `${base}UPDATE_SOCIAL_SECURITY`
    , UPDATE_VEHICLE_YEAR = `${base}UPDATE_VEHICLE_YEAR`
    , UPDATE_VEHICLE_MILEAGE = `${base}UPDATE_VEHICLE_MILEAGE`
    , UPDATE_VEHICLE_MAKE = `${base}UPDATE_VEHICLE_MAKE`
    , UPDATE_VEHICLE_MODEL = `${base}UPDATE_VEHICLE_MODEL`


const updateId = id => {
  return {
    type: UPDATE_ID,
    id
  }
}

const updateSessionId = sessionId => {
  return {
    type: UPDATE_SESSION_ID,
    sessionId
  }
}

const updateIncome = income => {
  return {
    type: UPDATE_INCOME,
    income
  }
}

const updateCreditRatingId = creditRatingId => {
  return {
    type: UPDATE_CREDIT_RATING_ID,
    creditRatingId
  }
}

const updateFirstName = firstName => {
  return {
    type: UPDATE_FIRST_NAME,
    firstName
  }
}

const updateLastName = lastName => {
  return {
    type: UPDATE_LAST_NAME,
    lastName
  }
}

const updateEmail = email => {
  return {
    type: UPDATE_EMAIL,
    email
  }
}

const updateMobilePhone = mobilePhone => {
  return {
    type: UPDATE_MOBILE_PHONE,
    mobilePhone
  }
}

const updateHomePhone = homePhone => {
  return {
    type: UPDATE_HOME_PHONE,
    homePhone
  }
}

const updateAddress = address => {
  return {
    type: UPDATE_ADDRESS,
    address
  }
}

const updateCityStateZip = cityStateZip => {
  return {
    type: UPDATE_CITY_STATE_ZIP,
    cityStateZip
  }
}

const updateResidenceTypeId = residenceTypeId => {
  return {
    type: UPDATE_RESIDENCE_TYPE_ID,
    residenceTypeId
  }
}

const updateResidenceTime = residenceTime => {
  return {
    type: UPDATE_RESIDENCE_TIME,
    residenceTime
  }
}

const updateResidenceCost = residenceCost => {
  return {
    type: UPDATE_RESIDENCE_COST,
    residenceCost
  }
}

const updateEmployer = employer => {
  return {
    type: UPDATE_EMPLOYER,
    employer
  }
}

const updateEmploymentTime = employmentTime => {
  return {
    type: UPDATE_EMPLOYMENT_TIME,
    employmentTime
  }
}

const updateWorkPhone = workPhone => {
  return {
    type: UPDATE_WORK_PHONE,
    workPhone
  }
}

const updateJobTitle = jobTitle => {
  return {
    type: UPDATE_JOB_TITLE,
    jobTitle
  }
}

const updateDateOfBirth = dob => {
  return {
    type: UPDATE_DATE_OF_BIRTH,
    dob
  }
}

const updateSocialSecurity = ssn => {
  return {
    type: UPDATE_SOCIAL_SECURITY,
    ssn
  }
}

const updateVehicleYear = year => {
  return {
    type: UPDATE_VEHICLE_YEAR,
    year
  }
}

const updateVehicleMileage = mileage => {
  return {
    type: UPDATE_VEHICLE_MILEAGE,
    mileage
  }
}

const updateVehicleMake = make => {
  return {
    type: UPDATE_VEHICLE_MAKE,
    make
  }
}

const updateVehicleModel = model => {
  return {
    type: UPDATE_VEHICLE_MODEL,
    model
  }
}



export default {
  updateId,
  updateSessionId,
  updateIncome,
  updateCreditRatingId,
  updateFirstName,
  updateLastName,
  updateEmail,
  updateMobilePhone,
  updateHomePhone,
  updateAddress,
  updateCityStateZip,
  updateResidenceTypeId,
  updateResidenceTime,
  updateResidenceCost,
  updateEmployer,
  updateEmploymentTime,
  updateWorkPhone,
  updateJobTitle,
  updateDateOfBirth,
  updateSocialSecurity,
  updateVehicleYear,
  updateVehicleMileage,
  updateVehicleMake,
  updateVehicleModel,

  UPDATE_ID,
  UPDATE_SESSION_ID,
  UPDATE_INCOME,
  UPDATE_CREDIT_RATING_ID,
  UPDATE_FIRST_NAME,
  UPDATE_LAST_NAME,
  UPDATE_EMAIL,
  UPDATE_MOBILE_PHONE,
  UPDATE_HOME_PHONE,
  UPDATE_ADDRESS,
  UPDATE_CITY_STATE_ZIP,
  UPDATE_RESIDENCE_TYPE_ID,
  UPDATE_RESIDENCE_TIME,
  UPDATE_RESIDENCE_COST,
  UPDATE_EMPLOYER,
  UPDATE_EMPLOYMENT_TIME,
  UPDATE_WORK_PHONE,
  UPDATE_JOB_TITLE,
  UPDATE_DATE_OF_BIRTH,
  UPDATE_SOCIAL_SECURITY,
  UPDATE_VEHICLE_YEAR,
  UPDATE_VEHICLE_MILEAGE,
  UPDATE_VEHICLE_MAKE,
  UPDATE_VEHICLE_MODEL
}
