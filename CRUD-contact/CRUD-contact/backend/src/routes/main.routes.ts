
import { Router } from "express";
import conatctRoutes from "./contact.routes";


const mainRoutes = Router();

// MAIN ROUTES 
mainRoutes.use("/contact", conatctRoutes);

export default mainRoutes;
