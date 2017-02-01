/*!
 * Finance.CAR.com v1.0.0
 * (Nasdaq: ABTL) - http://www.autobytel.com 
 * Copyright (c) 2016, Autobytel Inc. - All Rights Reserved.
 * 
 * Author: Greg Lane
 */


(function ($, win, undefined) {
  //#region - closure declarations

  var location = win.location
    , utils = win.FCC.UTILS
    , mergeObjs = utils.mergeObjs
    , store = win.__store__
    , stringifyJson = JSON.stringify
    , trim_head_regex = /^\s+/g
    , trim_tail_regex = /\s+$/g
    , trim_nonalpha_regex = /[^a-z A-Z]/g
    , trim_nondigit_regex = /[^0-9]/g
    , true_bool = !0
    , false_bool = !true_bool
    , leadApiUrl = 'api/lead/'
    , zipApiUrl = 'api/zipcode/'
    , post_method = 'POST'
    , get_method = 'GET'
    , click_event = 'click'
    , change_event = 'change'
    , blur_event = 'blur'
    , change_input_paste_events = change_event + ' input paste'
    , replace_fn = 'replace'
    , serializeArray_fn = 'serializeArray'
    , validate_fn = 'validate'
    , length_prop = 'length'
    , hide_class = 'hide'
    , invalid_str = 'invalid'
    , invalidWrap_id = '#' + invalid_str + 'Wrap'
    , invalidMsg_class = invalid_str + '-msg'
    , checkedRadioButton = 'input:radio[name="radioBtns"]:checked'
    , lead_storage_key = 'leadData'
    , csz_storage_key = 'cityStateZips'
    , leadFormTagId = '#partialLeadForm'
    , please_prefix = 'Please '
    , err_summary_props = {
        errorContainer: invalidWrap_id,
        errorClass: invalidMsg_class,
        errorLabelContainer: invalidWrap_id + ' ul',
        wrapper: 'li'
      }
    , defaultDataStruct = {
        stagedId: 0,
        zipcode: '',
        annualIncome: '',
        selfCreditRating: '',
        fname: '',
        lname: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        residenceMos: 0,
        residenceType: '',
        residenceMoPymt: '0',
        employerName: '',
        jobTitle: '',
        dob: '',
        ssn: ''
      }


  //#endregion



  //#region - proto mix-ins

  Number.prototype.toMoney = function (n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n))

    return (c ? num[replace_fn]('.', c) : num)[replace_fn](new RegExp(re, 'g'), '$&' + (s || ','))
  }

  //#endregion


  //#region - private funcs

  var noop = function () {}

  var getNextUrl = function () {
    return $(leadFormTagId).attr('action')
  }

  var setLabelText = function (id, text) {
    $('label[for="' + id + '"]').text(text)
  }

  var resetLocalStorage = function() {
    store.clear()
    return store.set(lead_storage_key, defaultDataStruct)
  }

  var storeWithPreviousLeadData = function (obj) {
    var storageData = store.get(lead_storage_key) || resetLocalStorage()
    if (!obj) {
      return storageData
    }

    return store.set(lead_storage_key, $.extend(storageData, obj))
  }

  var sendPartialLeadDataToServer = function (data, successCallback) {
    successCallback = successCallback || noop

    $.ajax({
      type: post_method,
      url: leadApiUrl + data.stagedId,
      data: { '': stringifyJson(data) }
    }).done(function (resp) {
      if (resp.isKosher) {
        storeWithPreviousLeadData({ stagedId: resp.data.stagedId })
        successCallback(resp)
      }
    })
  }

  var doServerSidePlacementCheck = function(data, successCallback) {
    successCallback = successCallback || noop

    $.ajax({
      type: post_method,
      url: leadApiUrl + 'placement-check',
      data: { '': stringifyJson(data) }
    }).done(function (resp) {
      successCallback(resp)
    })
  }

  var formatPhone = function (digits) {
    var length = digits[length_prop]

    return (length > 2 ? '(' : '')
          + digits.substr(0, 3)
          + (length > 2 ? ') ' : '')
          + digits.substr(3, 3)
          + (length > 5 ? '-' : '')
          + digits.substr(6, 4)
  }

  var formatCityStateZip = function (obj) {
    return obj.city + ', ' + obj.state + ' ' + obj.zip
  }

  var setValidationIcons = function (element, isValid) {
    var addClass_fn = 'addClass'
      , removeClass_fn = 'removeClass'
      , $parent = $(element).parent()
      , notValidIcon = $parent.find('.icon-not-valid')
      , validIcon = $parent.find('.icon-valid')

    if (isValid === undefined) {
      notValidIcon[addClass_fn](hide_class)
      validIcon[addClass_fn](hide_class)
    }
    else if (isValid) {
      notValidIcon[addClass_fn](hide_class)
      validIcon[removeClass_fn](hide_class)
    } else {
      notValidIcon[removeClass_fn](hide_class)
      validIcon[addClass_fn](hide_class)
    }

    return isValid
  }

  //#endregion


  //#region - custom validators

  var validZipcodesCache = []

  $.validator.addMethod('zip', function (value, element) {
    if (this.optional(element) || /^\d{5}$/.test(value)) {

      var validatedZipcode = validZipcodesCache.filter(function(item) {
        return item.query === value
      })[0]

      if (!!validatedZipcode) {
        return setValidationIcons(element, validatedZipcode.isKosher)
      }

      $.ajax({
        type: get_method,
        url: zipApiUrl + value
      }).done(function (resp) {

        // micro-cache zips
        validZipcodesCache.push(resp)

        if (resp.isKosher) {
          var cszs = resp.cityStateZips
             , zipQry = resp.query
             , cachedZipQry = {}


          cachedZipQry[zipQry] = cszs
          store.set(csz_storage_key, mergeObjs(store.get(csz_storage_key) || {}, cachedZipQry))
        }

        $(element).valid()
      })
    }

    return setValidationIcons(element, false_bool)
  }, please_prefix + 'specify a valid ZIP code')


  $.validator.addMethod('names', function (value, element, minlength) {
    var reg = new RegExp('^\s*([a-z A-Z\s]{' + minlength + ',})\s*$')

    return setValidationIcons(element, (this.optional(element) === true_bool || reg.test(value)))
  })
  

  $.validator.addMethod('email', function (value, element) {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return setValidationIcons(element, (this.optional(element) || reg.test(value)) && value[length_prop] > 5)
  }, please_prefix + 'specify a valid email')


  $.validator.addMethod('phone', function (value, element) {
    var reg = /^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9])) ?[2-9]([02-9]\d|1[02-9])-?\d{4}$/

    return setValidationIcons(element, (this.optional(element) || value[length_prop] > 9) && reg.test(value))
  }, please_prefix + 'specify a valid phone number')


  $.validator.addMethod('addr', function (value, element) {
    return setValidationIcons(element, (this.optional(element) === true_bool || value[length_prop] > 3))
  }, please_prefix + 'provide a street address')


  $.validator.addMethod('csz', function (value, element) {
    var reg = /[\w ]+, \w{2} \d{5}/

    return setValidationIcons(element, (this.optional(element) || value[length_prop] > 10) && reg.test(value))
  }, please_prefix + 'provide a valid city, state code and zip</br>(e.g. Irvine, CA 90630)')


  $.validator.addMethod('empl', function (value, element) {
    return setValidationIcons(element, (this.optional(element) === true_bool || value[length_prop] > 3))
  })


  $.validator.addMethod('ssn', function (value, element) {
    var reg = /\d{3}-\d{2}-\d{4}/

    return setValidationIcons(element, (this.optional(element) === true_bool || value[length_prop] === 11) && reg.test(value))
  }, please_prefix + 'specify a valid social security number')


  $.validator.addMethod('currency', function (value, element, param) {
    var isParamString = typeof param === 'string',
        symbol = isParamString ? param : param[0],
        soft = isParamString ? true : param[1],
        regex

    symbol = symbol.replace(/,/g, '')
    symbol = soft ? symbol + ']' : symbol + ']?'
    regex = '^[' + symbol + '([1-9]{1}[0-9]{0,2}(\\,[0-9]{3})*(\\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\\.[0-9]{0,2})?|0(\\.[0-9]{0,2})?|(\\.[0-9]{1,2})?)$'
    regex = new RegExp(regex)
    return this.optional(element) || regex.test(value)
  })

  //#endregion




  var App = (function() {
    var _init = function() {
      var pathname = location.pathname

      // First, lez find out which page we is on!
      switch (pathname) {
        case '/':
          resetLocalStorage()
          Zipcode.init()
          break

        case '/annual-income':
          AnnualIncome.init()
          break;

        case '/credit-rating':
          CreditRating.init()
          break;

        case '/contact-info':
          ContactInfo.init()
          break;

        case '/address-info':
          AddressInfo.init()
          break;

        case '/residence-time':
          ResidenceTime.init()
          break;

        case '/residence-type':
          ResidenceType.init()
          break;

        case '/residence-payment':
          ResidencePayment.init()
          break;

        case '/employment':
          Employment.init()
          break;

        case '/date-of-birth':
          DateOfBirth.init()
          break;

        case '/social-security':
          SocialSecurity.init()
          break;

        case '/congratulations':
          Congratulations.init()
          break;

        case '/no-placement':
          NoPlacement.init(pathname)
          break;


        default:
          break
      }
    }

    return {
      init: _init
    }
  })()


  var Zipcode = (function() {
    var _init = function () {
      var $zip = $('#zip')

      $zip.on(change_input_paste_events, function () {
          var $this = $(this)
            , currVal = $this.val()
            , newVal = currVal[replace_fn](/[^0-9]/g, '').substr(0, 5)
            , caretPos = $this.caret()


          if (currVal !== newVal) {
            $this.val(newVal)
            $this.caret(caretPos)
          }

        })
        .on('focus', function() {
          $(this).select()
        })
      
      setTimeout(function () {
        $zip.focus()
      }, 50)


      $(leadFormTagId)[validate_fn]({
        errorLabelContainer: invalidWrap_id,
        errorClass: invalidMsg_class,
        submitHandler: function (form) {
          var data = {}

          $(form)[serializeArray_fn]().map(function (item) {
            data[item.name] = item.value // zipcode
          })

          data = storeWithPreviousLeadData(data)
          sendPartialLeadDataToServer(data, function(resp) {
            location.href = getNextUrl()
          })
        },
        rules: {
          zipcode: {
            zip: true_bool
          }
        }
      })
    }

    return {
      init: _init
    }
  })()


  var AnnualIncome = (function () {
    var _init = function () {
      var $inc = $('#inc')
      
      // update income slider label
      $inc.on(change_event, function() {
          var $this = $(this)
            , value = $this.val()

          setLabelText($this.attr('id'), '$' + (+value).toMoney())
        })
        .val(0)

      setTimeout(function () {
        $inc.focus()
      }, 50)



      $(leadFormTagId)[validate_fn]({
        submitHandler: function (form) {
          var data = {}

          $(form)[serializeArray_fn]().map(function (item) {
            data[item.name] = item.value // annualIncome
          })

          data = storeWithPreviousLeadData(data)
          sendPartialLeadDataToServer(data, function (resp) {
            location.href = getNextUrl()
          })
        },
        rules: {
          annualIncome: {
            required: true_bool
          }
        }
      })
    }

    return {
      init: _init
    }
  })()


  var CreditRating = (function () {
    var _init = function () {

      $(leadFormTagId)[validate_fn]({
        submitHandler: function (form) {
          var data = {
            selfCreditRating: $(form).find(checkedRadioButton).val()
          }

          data = storeWithPreviousLeadData(data)

          sendPartialLeadDataToServer(data)

          doServerSidePlacementCheck({
            zipcode: data.zipcode,
            selfCreditRating: data.selfCreditRating,
            gmi: Math.round(data.annualIncome / 12)
          }, function(resp) {
            if (resp.isKosher) {
              location.href = getNextUrl()
            } else {
              location.href = '/no-placement'
            }
          })
        },
        rules: {
          radioBtns: {
            required: true_bool
          }
        }
      })
    }

    return {
      init: _init
    }
  })()


  var ContactInfo = (function () {
    var _init = function () {
      var fname_id = '#fname'
        , lname_id = '#lname'
        , minlen = 2


      $(fname_id + ',' + lname_id).on(change_input_paste_events, function () {
        var $this = $(this)
          , currVal = $this.val()
          , newVal = currVal[replace_fn](trim_nonalpha_regex, '')[replace_fn](trim_head_regex, '')
          , caretPos = $this.caret()


        if (currVal !== newVal) {
          $this.val(newVal)
          $this.caret(caretPos)
        }
          
      })
      .on(blur_event, function () {
        var $this = $(this)
        $this.val($this.val()[replace_fn](trim_tail_regex, ''))
      })


      $('#email').on(change_input_paste_events, function () {
        var $this = $(this)
          , currVal = $this.val()
          , newVal = currVal[replace_fn](trim_head_regex, '')[replace_fn](trim_tail_regex, '').toLowerCase()
          , caretPos = $this.caret()


        if (currVal !== newVal) {
          $this.val(newVal)
          $this.caret(caretPos)
        }

      })


      $('#phone').on(change_input_paste_events, function() {
        var $this = $(this)
          , currVal = $this.val()
          , newVal = currVal[replace_fn](/[^0-9- ()]/g, '')
          , numOfNonDigitChars = currVal[length_prop] - currVal[replace_fn](trim_nondigit_regex, '')[length_prop]
          , caretPos = $this.caret()

        newVal = newVal.substr(0, 10 + numOfNonDigitChars)

        if (currVal !== newVal) {
          $this.val(newVal)
          $this.caret(caretPos)
        }

      })
      .on(blur_event, function() {
        var $this = $(this)
          , strippedVal = $this.val()[replace_fn](trim_nondigit_regex, '')

        $this.val(formatPhone(strippedVal))
      })

      setTimeout(function () {
        $(fname_id).focus()
      }, 50)
      


      $(leadFormTagId)[validate_fn](mergeObjs(err_summary_props, {
        submitHandler: function (form) {
          var data = {}

          $(form)[serializeArray_fn]().map(function (item) {
            data[item.name] = item.value
          })

          data = storeWithPreviousLeadData(data)
          sendPartialLeadDataToServer(data, function (resp) {
            location.href = getNextUrl()
          })
        },
        rules: {
          fname: {
            names: minlen
          },
          lname: {
            names: minlen
          },
          email: {
            email: true_bool
          },
          phone: {
            phone: true_bool
          }
        },
        messages: {
          fname: {
            names: please_prefix + 'enter your first name'
          },
          lname: {
            names: please_prefix + 'enter your last name'
          }
        }
      }))
    }

    return {
      init: _init
    }
  })()


  var AddressInfo = (function () {
    var _init = function () {

      var $addr = $('#addr')
        , $csz = $('#csz')
        , csz = (store.get(csz_storage_key) || {})[(store.get(lead_storage_key) || {}).zipcode]


      csz ? $csz.val(formatCityStateZip(csz[0])) : noop()

      $addr.on(blur_event, function() {
        var $this = $(this)

        $this.val($this.val()[replace_fn](trim_tail_regex, '')[replace_fn](trim_head_regex, '').substr(0, 60))
      })

      setTimeout(function () {
        $addr.focus()
      }, 50)


      $(leadFormTagId)[validate_fn](mergeObjs(err_summary_props, {
        submitHandler: function (form) {
          var data = {}

          $(form)[serializeArray_fn]().map(function (item) {
            data[item.name] = item.value
          })

          // split out the city|state|zip from csz
          var splitPartsArr = data.csz.split(',')
            , stateZipArr = splitPartsArr[1][replace_fn](trim_tail_regex, '')[replace_fn](trim_head_regex, '').split(' ')

          data.city = splitPartsArr[0]
          data.state = stateZipArr[0]
          data.zipcode = stateZipArr[1]
          delete data.csz

          data = storeWithPreviousLeadData(data)
          sendPartialLeadDataToServer(data, function (resp) {
            location.href = getNextUrl()
          })
        },
        rules: {
          address: {
            addr: true_bool
          },
          csz: {
            csz: true_bool
          }
        }
      }))
    }

    return {
      init: _init
    }
  })()


  var ResidenceTime = (function () {
    var _init = function () {
      var $yrs = $('#yrs')

      // update year slider label
      $yrs.on(change_event, function () {
        var $this = $(this)
          , value = $this.val()
          , suffix = value === '1' ? ' Year' : ' Years'
        
        setLabelText($this.attr('id'), value + suffix)
      })

      setTimeout(function () {
        $yrs.focus()
      }, 50)


      // update month slider label
      $('#mos').on(change_event, function () {
        var $this = $(this)
          , value = $this.val()
          , suffix = value === '1' ? ' Month' : ' Months'

        setLabelText($this.attr('id'), value + suffix)
      })


      $(leadFormTagId)[validate_fn]({
        submitHandler: function (form) {
          var data = {}

          $(form)[serializeArray_fn]().map(function (item) {
            data[item.name] = item.value
          })

          data.residenceMos = data.years * 12 + +data.months
          delete data.years
          delete data.months

          data = storeWithPreviousLeadData(data)
          sendPartialLeadDataToServer(data, function (resp) {
            location.href = getNextUrl()
          })
        },
        rules: {
          years: {
            required: true_bool
          },
          months: {
            required: true_bool
          }
        }
      })
    }

    return {
      init: _init
    }
  })()


  var ResidenceType = (function () {
    var _init = function () {

      $(leadFormTagId)[validate_fn]({
        submitHandler: function (form) {
          var data = {
            residenceType: $(form).find(checkedRadioButton).val()
          }

          data = storeWithPreviousLeadData(data)
          sendPartialLeadDataToServer(data, function (resp) {
            location.href = getNextUrl()
          })
        },
        rules: {
          radioBtns: {
            required: true_bool
          }
        }
      })
    }

    return {
      init: _init
    }
  })()


  var ResidencePayment = (function () {
    var _init = function () {
      var $pymt = $('#pymt')

      // update payment slider label
      $pymt.on(change_event, function () {
        var $this = $(this)
          , value = $this.val()

        setLabelText($this.attr('id'), '$' + (+value).toMoney())
      })

      setTimeout(function () {
        $pymt.focus()
      }, 50)


      $(leadFormTagId)[validate_fn]({
        submitHandler: function (form) {
          var data = {}

          $(form)[serializeArray_fn]().map(function (item) {
            data[item.name] = item.value
          })

          data = storeWithPreviousLeadData(data)
          sendPartialLeadDataToServer(data, function (resp) {
            location.href = getNextUrl()
          })
        },
        rules: {
          residenceMoPymt: {
            required: true_bool
          }
        }
      })
    }

    return {
      init: _init
    }
  })()


  var Employment = (function () {
    var _init = function () {

      setTimeout(function () {
        $('#emp').focus()
      }, 50)
      

      $(leadFormTagId)[validate_fn](mergeObjs(err_summary_props, {
        submitHandler: function (form) {
          var data = {}

          $(form)[serializeArray_fn]().map(function (item) {
            data[item.name] = item.value
          })

          data = storeWithPreviousLeadData(data)
          sendPartialLeadDataToServer(data, function (resp) {
            location.href = getNextUrl()
          })
        },
        rules: {
          employerName: {
            empl: true_bool
          },
          jobTitle: {
            empl: true_bool
          }
        },
        messages: {
          employerName: {
            empl: please_prefix + 'provide your employer\'s name'
          },
          jobTitle: {
            empl: please_prefix + 'specify your job title'
          }
        }
      }))
    }

    return {
      init: _init
    }
  })()


  var DateOfBirth = (function () {
    var _init = function () {
      var selector = 'select[name="'

      setTimeout(function () {
        $(selector + 'month"]').focus()
      }, 50)
      

      $(leadFormTagId)[validate_fn]({
        submitHandler: function (form) {
          var mo = $(form).find(selector + 'month"]').val()
            , da = $(form).find(selector + 'day"]').val()
            , yr = $(form).find(selector + 'year"]').val()
            , data = { dob: mo + '/' + da + '/' + yr }

          data = storeWithPreviousLeadData(data)
          sendPartialLeadDataToServer(data, function (resp) {
            location.href = getNextUrl()
          })
        },
        rules: {
          month: {
            required: true_bool
          },
          day: {
            required: true_bool
          },
          year: {
            required: true_bool
          }
        }
      })
    }

    return {
      init: _init
    }
  })()


  var SocialSecurity = (function () {
    var _init = function () {
      var $ssn = $('#ssn')

      $ssn.mask('999-99-9999')

      setTimeout(function() {
        $ssn.focus()
      }, 50)
      

      $(leadFormTagId)[validate_fn]({
        errorLabelContainer: invalidWrap_id,
        errorClass: invalidMsg_class,
        submitHandler: function (form) {
          var data = {}

          $(form)[serializeArray_fn]().map(function (item) {
            data[item.name] = item.value
          })

          data = storeWithPreviousLeadData(data)

          sendPartialLeadDataToServer(data)

          doServerSidePlacementCheck({
            zipcode: data.zipcode,
            selfCreditRating: data.selfCreditRating,
            gmi: data.monthlyIncome,
            ssn: data.ssn
          }, function (resp) {
            if (resp.isKosher) {
              location.href = getNextUrl()
            } else {
              location.href = '/no-placement/duplicate-application'
            }
          })
        },
        rules: {
          ssn: {
            ssn: true_bool
          }
        }
      })
    }

    return {
      init: _init
    }
  })()


  var NoPlacement = (function() {
    var _init = function(pathname) {

    }

    return {
      init: _init
    }
  })()

  var Congratulations = (function () {
    var _init = function () {

    }

    return {
      init: _init
    }
  })()

  

  App.init()

})(jQuery, window, []._)