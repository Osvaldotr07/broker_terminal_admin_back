const express = require("express");
const FormService = require("../services/form");
const passport = require("passport");
const  authenticated  = require("../utils/middlewares/middleware");
const { formIdSchema, createFormSchema } = require("../utils/schemas/forms");

require("../utils/auth/strategies/jwt");

function formsApi(app) {
  const router = express.Router();
  app.use("/api/forms", router);
  const formService = new FormService();
  router.post(
    "/",
    passport.authenticate("jwt", {
      session: false,
    }),
    async (req, res, next) => {
      // const { email } = req.body;
      try {
        const forms = await formService.getForms(null);
        res.status(200).json({
          data: forms,
          message: "Form List",
        });
      } catch (err) {
        console.log(err);
        next(err);
      }
    }
  );

  router.post('/validateToken', (req, res) => {
    const {token} = req.body
    console.log(token)
    if(token) {
          jwt.verify(token, config.authJwtSecret, (err, encoded) => {
              if(err) {
                  res.status(401)
              }
              else {
                  res.status(201)
              }
          })
      }
      else {
          res.status(401)
      }
  })


  router.get(
    "/:formId",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
      const { formId } = req.params;

      try {
        const form = await formService.getForm({ formId });
        res.status(200).json({
          data: movies,
          message: "Form Retrived",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    "/:formId",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
      const { formId } = req.params;
      console.log(req.params);
      try {
        const idForm = await formService.deleteForm({ formId });
        res.status(200).json({
          message: "removed",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    "/createForm",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
      const { body: form } = req;
      console.log(req.body);
      try {
        const createFormId = await formService.createForm({ form });
        res.status(200).json({
          data: createFormId,
          message: "Form created",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    "/updateForm",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
      const { body: form } = req;
      const formId = form._id;
      try {
        delete form._id;
        const updateFormId = await formService.updateForm(formId, form);
        res.status(200).json({
          data: updateFormId,
          message: "Form updated",
        });
      } catch (err) {
        console.log(err);
        next(err);
      }
    }
  );
}

module.exports = formsApi;
