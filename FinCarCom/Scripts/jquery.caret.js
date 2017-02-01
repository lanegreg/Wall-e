(function ($, win) {
  var string_str = 'string'
    , number_str = 'number'
    , character_str = 'character'
    , object_str = 'object'
    , selectionStart_fn = 'selectionStart'
    , selectionEnd_fn = 'selectionEnd'
    , length_fn = 'length'
    , moveStart_fn = 'moveStart'
    , moveEnd_fn = 'moveEnd'
    , doc = win.document


  /* 
   *  This is a utility function to find the start and end positions
   *  of a substring or regular expression within a given string.
   */
  var findRange = function (str, arg1) {
    var start = 0
      , end = 0
      , strObjType = Object.prototype.toString.call(arg1)

    /* STRING */
    if (typeof (arg1) === string_str) {
      /* Search for the string.  If we find it, figure out the start and end points so we can highlight it. */
      var strIndex = str.indexOf(arg1)

      if (strIndex >= 0) {
        start = strIndex
        end = strIndex + arg1[length_fn]
      }


      /* REGULAR EXPRESSION */
    } else if (strObjType === '[object RegExp]') {
      /* Evaluate the regular expression.  Figure out the start
         and end points. */
      var re = arg1.exec(str)

      if (re !== null) {
        start = re.index
        end = start + re[0][length_fn]
      }
    }

    return [start, end]
  }


  /* 
   *  This is a utility function to find out the currently selected
   *  text is no matter what the browser is.  It returns an array
   *  of the format [start, end].
   */
  var getSelectRange = function (domNode) {
    var selectStart
      , selectEnd
      , r1
      , r2


    /* This is what actually figures out the selection positions. */
    selectStart = domNode[selectionStart_fn]
    selectEnd = domNode[selectionEnd_fn]


    /* 
     *  If we're on a browser that supports the selectionStart method,
     *  then just return an array w/ the start & end values.
     */
    if (typeof (selectStart) === number_str) {
      return [selectStart, selectEnd]
    }


    /* 
     *  Our browser doesn't support selectionStart so maybe we can 
     *  hack around it with the document.selection property.
     */
    if (doc.selection) {
      var createRange_fn = 'createRange'
        , duplicate_fn = 'duplicate'


      r1 = doc.selection[createRange_fn]()[duplicate_fn]()
      r2 = doc.selection[createRange_fn]()[duplicate_fn]()

      /* Figure out the selection start position. */
      r1[moveEnd_fn](character_str, domNode.value[length_fn])
      selectStart = domNode.value.lastIndexOf(r1.text)

      if (r1.text === '') {
        selectStart = domNode.value[length_fn]
      }

      /* Figure out the selection end position. */
      r2[moveStart_fn](character_str, (-1 * domNode.value[length_fn]))
      selectEnd = r2.text[length_fn]

      return [selectStart, selectEnd]
    }


    /* If we got here, something went wrong. */
    return null
  }


  /* 
   *  This is a utility function to set the selected text no 
   *  matter what the browser is.  It takes as arguments the start
   *  and end positions of the text to select.
   */
  var setSelectRange = function(domNode, start, end) {

    ///* Internet explorer is retarded so we have to use a different method do highlight the text. */
    //if ($.browser.msie) {
    //  var selRange = domNode.createTextRange()

    //  selRange.collapse(true)
    //  selRange[moveStart_fn](character_str, start)
    //  selRange[moveEnd_fn](character_str, end - start)
    //  selRange.select()

    //} else { /* Normal browsers, setting highlighted text range is easy. */
    //  domNode[selectionStart_fn] = start;
    //  domNode[selectionEnd_fn] = end;
    //}

    domNode[selectionStart_fn] = start
    domNode[selectionEnd_fn] = end

    domNode.focus()
  }



  var publiclyExposed = {

    init: function (arg1, arg2) {
      var jqNodes = this
        , domNode = jqNodes.get(0)
        , start
        , end


      /* If we got no arguments, then return the current range. */
      if (arg1 == undefined) {
        return getSelectRange(domNode)
      }


      /*  
       *  We got some arguments, so see what they are and set the
       *  the starting and ending selection range accordingly.
       */

      /* ARRAY OR DICTIONARY */
      if (typeof (arg1) === object_str) {

        /* Check for array object. */
        if (arg1.valueOf().splice) {
          start = arg1[0]
          end = arg1[1]

          /* Check for dictionary-type object. */
        } else if (typeof (arg1.start) === number_str && typeof (arg1.end) === number_str) {
          start = arg1.start
          end = arg1.end
        }


        /* NUMBER */
      } else if (typeof (arg1) === number_str) {
        start = arg1

        /* 
         *  Optionally, the second argument might be the end position
         *  of the selected text.  If not, there is no selected text
         *  so the end is the same as the start. 
         */
        if (typeof (arg2) === number_str) {
          end = arg2
        } else {
          end = start
        }

        /* BAD ARGS */
      } else {
        return null
      }


      /* We made it this far so select the text. */
      setSelectRange(domNode, start, end)

      return jqNodes
    },

    start: function (arg1) {
      var jqNodes = this
        , domNode = jqNodes.get(0)
        , range

      /* If we got an argument, find the start of the range. */
      if (arg1) {
        range = findRange(domNode.value, arg1)
        setSelectRange(domNode, range[0], range[0])

        /* Otherwise, position to the start of the field. */
      } else {
        setSelectRange(domNode, 0, 0)
      }

      return jqNodes
    },

    end: function (arg1) {
      var jqNodes = this
        , domNode = jqNodes.get(0)
        , lastpos = domNode.value[length_fn]
        , range

      /* If we got an argument, find the end of the range. */
      if (arg1) {
        range = findRange(domNode.value, arg1)
        setSelectRange(domNode, range[1], range[1])

        /* Otherwise, position to the end of the field. */
      } else {
        setSelectRange(domNode, lastpos, lastpos)
      }

      return jqNodes
    },

    text: function(replaceText) {
      var jqNodes = this
        , domNode = jqNodes.get(0)
        , val = domNode.value
        , range = getSelectRange(domNode)


      /* If we got no arguments, return the highlighted text. */
      if (!replaceText) {
        return val.slice(range[0], range[1])
      }


      /*
       *  We must have got an argument so that means we need to
       *  replace the selected text with the given string.
       */
      domNode.value = val.substr(0, range[0]) + replaceText + val.substr(range[1])
      domNode.focus()

      return jqNodes
    },

    find: function (arg1) {
      var jqNodes = this
        , domNode = jqNodes.get(0)

      /* Find the start/end positions of the range. */
      var range = findRange(domNode.value, arg1)

      /* If there's no range to select then refocus the field,
         preserving the current caret position and we're done. */
      if (range[0] == range[1]) {
        domNode.focus()

        /* We do have a range so select the text. */
      } else {
        setSelectRange(domNode, range[0], range[1])
      }

      return jqNodes
    }
  }



  /***** PLUGIN SCAFFOLD *****/

  $.fn.caret = function (method) {
    var jqNodes = this

    /* Figure out which method to call and pass the appropriate
       parameters. */
    if (publiclyExposed[method]) {
      return publiclyExposed[method].apply(jqNodes, Array.prototype.slice.call(arguments, 1)
      )
    }

    /* If no parameters are passed, just call the init routine. */
    if (typeof (method) === object_str || typeof (method) === number_str || !method) {
      return publiclyExposed.init.apply(jqNodes, arguments)
    }

    $.error('Method ' + method + ' does not exist on jQuery.caret')

    return null
  }

})(jQuery, window)