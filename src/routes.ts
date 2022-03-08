import { Router } from "express"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"
import { CreateComplimentController } from "./controllers/CreateComplimentController"
import { CreateTagController } from "./controllers/CreateTagController"
import { CreateUserController } from "./controllers/CreateUserController"
import { ListUserReceiveComplimentController } from "./controllers/ListComplimentReceiverController"
import { ListUserSendComplimentController } from "./controllers/ListComplimentSenderController"
import { ListTagsController } from "./controllers/ListTagsController"
import { ListUserController } from "./controllers/ListUserController"
import { ensureAdmin } from "./middlewares/ensureAdmin"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"
const router = Router()

const createUserController = new CreateUserController()
const createTagController= new CreateTagController()
const listTagsController = new ListTagsController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()
const listUserSendComplimentsController = new ListUserSendComplimentController()
const listUserReceiveComplimentController = new ListUserReceiveComplimentController()
const listUserController = new ListUserController()


router.post("/login", authenticateUserController.handle)
router.post("/tags", ensureAuthenticated, ensureAdmin,createTagController.handle)
router.get("/tags", ensureAuthenticated, listTagsController.handle)
router.post("/compliments", ensureAuthenticated, createComplimentController.handle)
router.post("/users", createUserController.handle)
router.get("/users", ensureAuthenticated, listUserController.handle)
router.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle)
router.get("/users/compliments/receiver", ensureAuthenticated, listUserReceiveComplimentController.handle)


export { router }