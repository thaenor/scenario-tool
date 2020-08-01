/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
const getParams = function (url) {
  var params = {};
  var parser = document.createElement('a');
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};

/**
 * Get URL property "title" meaning the ID if we are in an open doc
 */
function get_doc_id() {
  return getParams(window.location.href).title;
}

/**
 * Get URL property "scneario" 
 * Used only when opening caregivers in view mode
 */
function get_doc_id_second_param() {
  return getParams(window.location.href).scenario;
}

const confirm_on_exit = e => {
  e.preventDefault();
  e.returnValue = '';
}

function toggle_confirm_on_exit(flag) {
  if (flag) {
    window.addEventListener('beforeunload', confirm_on_exit);
  } else {
    window.removeEventListener('beforeunload', confirm_on_exit);
  }
}