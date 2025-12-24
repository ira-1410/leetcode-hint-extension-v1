## LeetCode Hint Chrome Extension ##
A Chrome extension that provides AI generated hints for LeetCode problems without revealing the solution. 

### The Problem ###
Students are encouraged to use LeetCode to improve their problem solving and coding skills, but often end up staring at the screen for hours with no idea how to go about it. Using Google, ChatGPT, or even looking in the solutions tab on LeetCode is unhelpful, as it usually reveals the answer itself.

This extension is for students who don't want to waste time racking their brain, and don't want to be spoon fed the answer either. You can get up to 3 hints only without being able to continuously regenerate them. It helps you improve your problem solving skills by encouraging critical thinking instead of replacing it.


### Features ###
* Content aware hints based on the current problem being viewed
* AI generated hints using common Leetcode patterns such as sliding window, two pointers, dynamic programming, etc.
* Hints revealed one at a time so students can challenge themselves to solve with less help
* Safety and privacy considerations - no user data is stored

### Demo ###
Find it in the [Chrome Webstore](https://chromewebstore.google.com/detail/pomnpmchkjeicenafnodjkiknbielmpi?utm_source=item-share-cb)
1. Open any LeetCode problem
2. Click the extension icon
3. Reveal hints using the + button
4. If hints aren't showing, simply hard refresh the page and try again.

### Tech Stack ###
Frontend (Chrome Extension)
* JavaScript
* HTML / CSS
* Chrome APIs: runtime, activeTab

Backend
* Node.js + Express
* Google Gemini API
* Render (deployment)

