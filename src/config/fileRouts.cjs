const { resolve } = require('node:path');
const express = require('express');

const uploadPath = resolve(__dirname, '..', '..', 'upload');
const fileRoutsConfig = express.static(uploadPath, { fallthrough: false });

module.exports = fileRoutsConfig;
