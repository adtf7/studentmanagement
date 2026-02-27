import {Router} from "express";

import {
    renderHome,
    renderAddStudent,
    addStudent,
    renderEditStudent,
    updateStudent,
    deleteStudent
} from "./controllers/studentController.js";

const router: Router = Router();

router.get("/", renderHome);
router.get("/add", renderAddStudent);
router.post("/add", addStudent);
router.get("/edit/:id", renderEditStudent);
router.post("/edit/:id", updateStudent);
router.post("/delete/:id", deleteStudent);

export default router;