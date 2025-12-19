const titleBox = document.getElementById("problem-title");
const hintsBox = document.getElementById("hints-container");
const button = document.getElementById("show-hint");
let hintsRevealed = 0;
let hints = [];

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "GET_PROBLEM_INFO" },
        (problemInfo) => {
        if (!problemInfo) {
            button.hidden = true;
            titleBox.innerText = "Could not detect problem.";
            return;
        }

        titleBox.innerText = problemInfo.title;

        chrome.runtime.sendMessage(
            {
            type: "FETCH_HINTS",
            payload: problemInfo
            },
            (response) => {
            if (!response || !response.success) {
                titleBox.innerText = "Fetching hints failed";
                return;
            }
            console.log(response);
            hintsRevealed = 0;
            hints = response.data.hints
            button.addEventListener("click", () => {
                if (hintsRevealed >= 3) return;

                const hint = hints[hintsRevealed++];
                const row = document.createElement("div");
                row.className = "hint-row";

                const number = document.createElement("div");
                number.className = "hint-number";
                number.innerText = hintsRevealed;

                const text = document.createElement("div");
                text.className = "hint-text";
                text.innerText = hint;

                row.appendChild(number);
                row.appendChild(text);
                hintsBox.appendChild(row);

                if (hintsRevealed==3) { button.hidden = true; }
            });

            /*response.data.hints.forEach((hint) => {
                const li = document.createElement("li");
                li.innerText = hint;
                hintsBox.appendChild(li);
            });*/
            }
        );
        }
    );
});
