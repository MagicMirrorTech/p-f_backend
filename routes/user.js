const router = require('express').Router();
const { getAllUsers, getOneUser, getUserAdmin, getUserLogisticManager, getUserPayrollManager, getUserSiteManager, getUserSuperAdmin, getUserTeamMate, getUsersWithoutAdmin, updateUser } = require('../controllers/user')

router.get('/all', getAllUsers)
router.get('/detail/:id', getOneUser)
router.get('/without-admin', getUsersWithoutAdmin)
router.get('/admins', getUserAdmin)
router.get('/super-admins', getUserSuperAdmin)
router.get('/logistic-managers', getUserLogisticManager)
router.get('/payroll-managers', getUserPayrollManager)
router.get('/site-managers', getUserSiteManager)
router.get('/team-mates', getUserTeamMate)

module.exports = router;