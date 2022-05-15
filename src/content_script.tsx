chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  // match *://nytimes.com/games/wordle/index.html
  if (msg.color) {
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change color to " + msg.color);
  } else {
    sendResponse("Color message is none.");
  }
});

window.addEventListener ("load", main, false);

function getTile(row:Number, col: Number) {
  let secondSelector = `#board > game-row:nth-child(${row})`;
  let thirdSelector = `div > game-tile:nth-child(${col})`;
  return document.querySelector("body > game-app")!.shadowRoot!.querySelector(secondSelector)!.shadowRoot!.querySelector(thirdSelector)!.shadowRoot!.querySelector("div");
}


function main() {

  
  function encodeState(wordleState : String) {
    console.log(wordleState);
    switch (wordleState) {
      case "empty":
        return "u"; // for unplayed
      case "present":
        return "p";
      case "absent":
        return "a";
      case "correct":
        return "c";
    }
  }
  
  let last_animated_tile = getTile(1, 5);

  last_animated_tile!.addEventListener("animationend", function (event) {

    if (event.animationName !== 'FlipOut') {
      return;
    }
    
    let w1_encoded =
      encodeState(getTile(1, 1)!.getAttribute("data-state")!)! +
      encodeState(getTile(1, 2)!.getAttribute("data-state")!)! +
      encodeState(getTile(1, 3)!.getAttribute("data-state")!)! +
      encodeState(getTile(1, 4)!.getAttribute("data-state")!)! +
      encodeState(getTile(1, 5)!.getAttribute("data-state")!)!;
 
    let w2_encoded =
      encodeState(getTile(2, 1)!.getAttribute("data-state")!)! +
      encodeState(getTile(2, 2)!.getAttribute("data-state")!)! +
      encodeState(getTile(2, 3)!.getAttribute("data-state")!)! +
      encodeState(getTile(2, 4)!.getAttribute("data-state")!)! +
      encodeState(getTile(2, 5)!.getAttribute("data-state")!)!;

    let w3_encoded =
      encodeState(getTile(3, 1)!.getAttribute("data-state")!)! +
      encodeState(getTile(3, 2)!.getAttribute("data-state")!)! +
      encodeState(getTile(3, 3)!.getAttribute("data-state")!)! +
      encodeState(getTile(3, 4)!.getAttribute("data-state")!)! +
      encodeState(getTile(3, 5)!.getAttribute("data-state")!)!;

    let w4_encoded = 
      encodeState(getTile(4, 1)!.getAttribute("data-state")!)! +
      encodeState(getTile(4, 2)!.getAttribute("data-state")!)! +
      encodeState(getTile(4, 3)!.getAttribute("data-state")!)! +
      encodeState(getTile(4, 4)!.getAttribute("data-state")!)! +
      encodeState(getTile(4, 5)!.getAttribute("data-state")!)!;

    let w5_encoded =
      encodeState(getTile(5, 1)!.getAttribute("data-state")!)! +
      encodeState(getTile(5, 2)!.getAttribute("data-state")!)! +
      encodeState(getTile(5, 3)!.getAttribute("data-state")!)! +
      encodeState(getTile(5, 4)!.getAttribute("data-state")!)! +
      encodeState(getTile(5, 5)!.getAttribute("data-state")!)!;

    let w6_encoded =
      encodeState(getTile(6, 1)!.getAttribute("data-state")!)! +
      encodeState(getTile(6, 2)!.getAttribute("data-state")!)! +
      encodeState(getTile(6, 3)!.getAttribute("data-state")!)! +
      encodeState(getTile(6, 4)!.getAttribute("data-state")!)! +
      encodeState(getTile(6, 5)!.getAttribute("data-state")!)!;

    let boardEncoded = w1_encoded + w2_encoded + w3_encoded + w4_encoded + w5_encoded + w6_encoded;
    console.log(boardEncoded)

    chrome.runtime.sendMessage({'content': boardEncoded});
  });
}


