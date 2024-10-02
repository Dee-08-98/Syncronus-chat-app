import express from 'express'
import sign from '../Controllers/SignUp.js'
import login from '../Controllers/login.js'
import profile from '../Controllers/profile.js'
import myprofile from '../Controllers/myprofile.js'
import allUsers from '../Controllers/allUsers.js'
import getallUsers from '../Controllers/getallUsers.js'
import group from '../Controllers/group.js'
import accessChat from '../Controllers/accessChat.js'
import authmiddleware from '../Middleware/tokenVerify.js'
import fetch from '../Controllers/fetchChats.js'
import rename from '../Controllers/renameGroup.js'
import remove from '../Controllers/removeGroup.js'
import add from '../Controllers/addToGroup.js'
import Sendmsg from '../Controllers/message.js'
import allMessage from '../Controllers/allMessage.js'
import logout from '../Controllers/logout.js'
import cookieAuth from '../Middleware/cookieAuthToken.js'
import allGroups from '../Controllers/groupsAll.js'
import findGroup from '../Controllers/findGroup.js'
const router = express.Router()

router.post('/user/register', sign)
router.post('/user/login', login)

router.post('/user/logout',authmiddleware, logout)

router.put('/user/profile/:ID', profile)
router.get('/user/myprofile/:ID', myprofile)

router.get('/user/alluser',authmiddleware, allUsers)
router.get('/user/getalluser',authmiddleware, getallUsers)

router.post('/user/group', authmiddleware, group)
router.post('/user/group/rename', authmiddleware, rename)
router.post('/user/group/remove', authmiddleware, remove)
router.post('/user/group/add', authmiddleware, add)
router.get('/user/group/all', authmiddleware, allGroups)
router.post('/user/group/one', authmiddleware, findGroup)




router.post('/user/accessChat', authmiddleware, accessChat)
router.get('/user/fetchChat', authmiddleware, fetch)

router.post('/user/message', authmiddleware, Sendmsg)
router.get('/user/message/:chatID', authmiddleware, allMessage)








export default router