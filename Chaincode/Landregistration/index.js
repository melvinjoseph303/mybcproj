/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const LandContract = require('./lib/land-contract');
const UserContract = require('./lib/user-contract');

module.exports.LandContract = LandContract;
module.exports.UserContract = UserContract;
module.exports.contracts = [ LandContract,UserContract ];
