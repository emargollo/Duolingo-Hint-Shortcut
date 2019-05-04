var tokens = [];
var keys = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var hints = [];

var onMouseEnter = new MouseEvent('mouseover', { bubbles: true });
var onMouseLeave = new MouseEvent('mouseout', { bubbles: true });

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

function findHintTokens() {
  return document.querySelectorAll("[data-test='hint-sentence'] > div");
}

function triggerTokenHint(currentToken) {
  tokens[currentToken].dispatchEvent(onMouseEnter);
  var tokenTimeout = tokens[currentToken];
  window.setTimeout(function () {
    tokenTimeout.dispatchEvent(onMouseLeave);
  }, 1500);
}

function addShortcutHint(token, i) {
  var div = document.createElement('div');
  div.classList.add('shortcut-hint');
  div.innerHTML = keys[i];
  token.insertBefore(div, token.firstChild);
}

function removeShortcutHints() {
  for (var i = 0; i < tokens.length; i++) {
    var hintArray = tokens[i].getElementsByClassName('shortcut-hint');
    for (var j = 0; j < hintArray.length; j++) {
      tokens[i].removeChild(hintArray[j]);
    }
  }
}

function displayShortcutHints() {
  removeShortcutHints();
  for (var i = 0; i < tokens.length; i++) {
    addShortcutHint(tokens[i], i);
  }

  setTimeout(function () {
    removeShortcutHints();
  }, 1000);
}

function handleArrowKeys(e) {
  e = e || window.event;
  
  tokens = findHintTokens();
  
  if (tokens.length === 0) return;
  
  if (e.ctrlKey) {
    e.preventDefault();
    displayShortcutHints();
    
    var key = e.key.toUpperCase();
    var pos = keys.indexOf(key);
    
    if (pos !== -1 && pos < tokens.length) {
      triggerTokenHint(pos)
    }
  }
}

addGlobalStyle(`.shortcut-hint {
  position: absolute;
  right: -10px;
  bottom: 18px;
  color: gray;
  width: 20px;
  height: 20px;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  text-align: center;
  padding: 2px;
  z-index: 1;
}`);

document.onkeydown = handleArrowKeys;