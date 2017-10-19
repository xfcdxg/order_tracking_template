;
(function() {
  var $ = function(selector, container) {
    if(!container) container = document
    return container['querySelector'](selector)
  }
  var $all = function(selector, container) {
    if(!container) container = document
    return container['querySelectorAll'](selector)
  }
  var $dom = function(name, innerText, container, onclick) {
    var dom = document.createElement(name)
    if (innerText || innerText === 0) {
      dom.innerText = innerText
    }
    if (onclick) {
      dom.onclick = onclick
    }
    if (container) {
      container.appendChild(dom)
    }
    return dom
  }
  var $tab = $('#tab')
  var $content = $('#content')
  var curTab = 0
  var curSider = 0
  var curData = {}
  var curSvc = {}

  var toggleNav = function(container, idx, cb) {
    var liArr = $all('li', container)
    liArr.forEach(function(li) { li.className = '' })
    liArr[idx] && (liArr[idx].className = 'active')
    cb && cb()
  }
  var resetData = function() {
    toggleNav($tab, curTab)
    toggleNav($sider, curSider)
  }
  var appendLi = function(container, text, onclick) {
    var li = $dom('li', text, container, onclick)
  }

  IM_DATA.forEach(function(tab, i) {
    appendLi($tab, tab.name, function() {
      curTab = i
      curSider = 0
      toggleNav($tab, curTab, function() {
        curData = IM_DATA[curTab]
        $content.innerHTML = ''
        curData.val.forEach(function(app) {
          var $company = $dom('div', '', $content)
          $company.className = 'company'
          var $title = $dom('div', app.name, $company)
          $title.className = 'title'
          $table = $dom('table', '', $company)
          var $tr = $dom('tr')
          $table.appendChild($tr)
          ROW_NAME.forEach(function(rowName, i) {
            $dom('th', rowName, $tr)
          })
          app.val.forEach(function(rowData) {
            var $tr = $dom('tr')
            rowData.forEach(function(o) {
              $dom('td', o, $tr)
            })
            if (rowData[1] > 0 && rowData[2] === 0) {
              $tr.className = 'warning'
            }

            $table.appendChild($tr)
          })
        })
      })
    })
  })
  $('li', $tab).click()
})()
