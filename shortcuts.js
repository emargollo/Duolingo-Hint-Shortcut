var currentToken = -1;
var tokens = [];

var onMouseEnter = new MouseEvent('mouseover', { bubbles: true });
var onMouseLeave = new MouseEvent('mouseout', { bubbles: true });

function findHintTokens() {
  return document.querySelectorAll("[data-test='hint-sentence'] > div");
}

function prevToken() {
  if (currentToken > 0) {
    currentToken--;
    return;
  }
  currentToken = 0;
}

function nextToken() {
  if (currentToken < (tokens.length - 1)) {
    currentToken++;
    return;
  }
  currentToken = (tokens.length - 1);
}

function showTokenHint() {
  tokens[currentToken].dispatchEvent(onMouseEnter);
  var tokenTimeout = tokens[currentToken];
  window.setTimeout(function () {
    tokenTimeout.dispatchEvent(onMouseLeave);
  }, 1500);
}

function handleArrowKeys(e) {
  e = e || window.event;
  var keyCode = e.keyCode || e.which;
  var arrow = { up: 38, down: 40 };

  tokens = findHintTokens();

  if (tokens.length === 0) return;

  if (e.ctrlKey) {
    switch (keyCode) {
      
      case arrow.up:
        prevToken();
        showTokenHint();
        break;
      case arrow.down:
        nextToken();
        showTokenHint();
        break;
    }
  }
}

document.onkeydown = handleArrowKeys;
