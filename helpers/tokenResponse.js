const tokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getSignedJwtToken()
  const options = {
    expired: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  }
  if (process.env.NODE_ENV === 'production') {
    options.secure = true
  }
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token, _id: user._id })
}

module.exports = tokenResponse
