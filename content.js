function getProblemInfo() {
  // class and ids are too confusing in leetcode pages
  // match using anchor links = /problems/<slug>/
  // tags are marked in the same way
  const links = document.querySelectorAll('a[href^="/problems/"]');
  const tags = document.querySelectorAll('a[href^="/tag/"]');
  let problemInfo = {title: null, tags: []};

  for (const link of links) {
    const text = link.innerText;
    if (text && /^\d+\.\s+/.test(text)) {
      problemInfo['title'] = text.replace(/^\d+\.\s+/, "");
      break;
    }
  }
  for (const tag of tags) {
    problemInfo['tags'].push(tag.innerText);
  }

  return problemInfo;
}

/* document.querySelector(".elfjS").innerText
.slice(0, document.querySelector(".elfjS").innerText.indexOf("Example"))
.replaceAll("\n", " ").trim() */


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_PROBLEM_INFO") {
    sendResponse(getProblemInfo());
  }
});