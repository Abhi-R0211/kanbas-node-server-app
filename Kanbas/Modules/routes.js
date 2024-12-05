import * as modulesDao from "./dao.js";
import mongoose from "mongoose";

export default function ModuleRoutes(app) {
 app.delete("/api/modules/:moduleId", async (req, res) => {
   const { moduleId } = req.params;
   const objectId = new mongoose.Types.ObjectId(moduleId);
   const status = await modulesDao.deleteModule(moduleId);
   res.send(status);
 });

app.put("/api/modules/:moduleId",  async (req, res) => {
    const { moduleId } = req.params;
    // if (!mongoose.Types.ObjectId.isValid(moduleId)) {
    //   return res.status(400).send({ error: "Invalid moduleId format" });
    // }
    const objectId = new mongoose.Types.ObjectId(moduleId);
    const moduleUpdates = req.body;
    const status = await modulesDao.updateModule(moduleId, moduleUpdates);
    res.send(status);
  });
}
