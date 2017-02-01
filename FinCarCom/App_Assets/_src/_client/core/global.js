

const qsArgs = name => {
  const win = window
      , match = RegExp('[?&]' + name + '=([^&]*)').exec(win.location.search)
  return match && win.decodeURIComponent(match[1].replace(/\+/g, ' '))
}

export const url = {
  qsArgs
}



const PURCHASE = 'purchase'
    , REFINANCE = 'refinance'
    , NO_QUALIFY = 'no_qualify'

export const appMode = {
  PURCHASE,
  REFINANCE,
  NO_QUALIFY
}
