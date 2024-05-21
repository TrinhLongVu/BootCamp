'use strict'

// catch error
const asyncHandler = asyncFunc => {
    return (req, res, next) => {
      asyncFunc(req, res, next).catch(next)
    }
}

module.exports = {asyncHandler}