
const Virtual = require("../dist/virtual");

const VIRTUAL_TEXT = "Virtual is defined";

function start() {
    test(VIRTUAL_TEXT, () => {
        expect(Virtual).toBeTruthy();
    });
}

start();