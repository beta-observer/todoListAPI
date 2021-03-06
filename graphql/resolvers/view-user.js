const { User } = require('../../js/models/User')
const { throwAnError, checkAndThrowError } = require('../../utils/error-handlers')
const updateUserActivity = require('../../assistants/update-user-activity')
const userDataManager = require('../assistants/handle-user-data')


module.exports = async function(username, client){
  try {
    !client && throwAnError('Authorization failed', 400)

    updateUserActivity(client._id)

    const userId = await User.getSpecificFields({ username: username }, { _id: 1 })

    return userDataManager(userId._id.toString(), client)
  } catch(err) {
    checkAndThrowError(err) 
  }
}