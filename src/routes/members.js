import express from "express";
import MembersController from "../controllers/MembersController";
import auth from "../middlewares/auth";
import excelChecker from "../middlewares/excelChecker";
import MembersValidations from "../validations/MembersValidations";

const routes = express.Router();

routes.post(
  "/",
  auth.checkToken,
  MembersValidations.member,
  MembersController.create
);
routes.get("/", auth.checkToken, MembersController.findAll);

routes
  .route("/:member_id([0-9]{1,10})")
  .get(auth.checkToken, MembersController.findOne)
  .put(auth.checkToken, MembersValidations.member, MembersController.update)
  .delete(auth.checkToken, MembersController.delete);

routes.get("/search", auth.checkToken, MembersController.search);
routes.get("/migrate", auth.checkToken, MembersController.migrate);
routes.get("/update", auth.checkToken, MembersController.updateMemberNumber);

routes.post(
  "/upload/:group_id([0-9]{1,10})",
  auth.checkToken,
  excelChecker,
  MembersController.uploadMembers
);
export default routes;
