const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let input = "";

function update() {
    display.textContent = input || "0";
}

buttons.forEach(btn => {
    btn.addEventListener("click", () => handle(btn.textContent));
});

function handle(val) {

    if (val === "C") {
        input = "";
        update();
        return;
    }

    if (val === "⌫") {
        input = input.slice(0, -1);
        update();
        return;
    }

    if (val === "=") {
        try {
            input = eval(input
                .replace("×", "*")
                .replace("÷", "/")
                .replace("−", "-")
            ).toString();
        } catch {
            input = "";
        }
        update();
        return;
    }

    if ("÷×−+".includes(val)) {
        input += val;
    }
    else if (!isNaN(val) || val === ".") {
        input += val;
    }

    update();
}

document.addEventListener("keydown", e => {

    if (!isNaN(e.key) || "+-*/.".includes(e.key)) {
        input += e.key;
    }
    else if (e.key === "Enter") {
        try { input = eval(input).toString(); } catch { input = ""; }
    }
    else if (e.key === "Backspace") {
        input = input.slice(0, -1);
    }
    else if (e.key === "Escape") {
        input = "";
    }

    update();
});
