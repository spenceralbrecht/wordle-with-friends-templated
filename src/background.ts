function polling() {
  // console.log("polling");
  setTimeout(polling, 1000 * 30);
}

polling();

chrome.runtime.onMessage.addListener((request, message, reply) => {
  console.log(request.content);
  if (request.greeting == "hello") reply({ farewell: "goodbye" });

  return true;
});