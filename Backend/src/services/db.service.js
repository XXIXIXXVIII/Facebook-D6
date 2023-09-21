/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const knex = require("knex");
const { knexConfig } = require("../configs/index");

module.exports = knex(knexConfig.development);
