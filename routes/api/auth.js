const express = require('express');
const router = express.Router();
const { bodyValidate, tokenValidation, upload } = require('../../middlewares');
const { authCtrl } = require('../../controllers');
const { schemas } = require('../../schemas/user');

router.post('/register', bodyValidate(schemas.userSchema), authCtrl.register);

router.post('/login', bodyValidate(schemas.userSchema), authCtrl.login);

router.post('/logout', tokenValidation, authCtrl.logout);

router.post(
  '/verify',
  bodyValidate(schemas.emailSchema),
  authCtrl.resendVerifyEmail
);

router.get('/current', tokenValidation, authCtrl.currentUser);

router.get('/verify/:verificationToken', authCtrl.verifyEmail);

router.patch(
  '/',
  tokenValidation,
  bodyValidate(schemas.patchSubscription),
  authCtrl.patchSubscription
);

router.patch(
  '/avatars',
  tokenValidation,
  upload.single('avatar'),
  authCtrl.updateAvatar
);

module.exports = router;
