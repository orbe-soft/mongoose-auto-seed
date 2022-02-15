"use strict";
exports.__esModule = true;
exports.Metadata = void 0;
var mongoose_1 = require("mongoose");
var metadataSchema = new mongoose_1["default"].Schema({
    title: {
        type: String
    },
    timestamp: {
        type: Number
    }
});
exports.Metadata = mongoose_1["default"].model("__MetadataSeeder", metadataSchema);
