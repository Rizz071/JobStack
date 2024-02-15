"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cypress_1 = require("cypress");
exports.default = (0, cypress_1.defineConfig)({
    e2e: {
        setupNodeEvents(_on, _config) {
            // implement node event listeners here
        },
        baseUrl: "http://127.0.0.1:3001/api",
    },
});
