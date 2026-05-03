import { Studymaterial } from "../models/studymaterial.js";

export function getMaterials(req, res) {
  const materials = Studymaterial.getMaterials();
  res.json(materials);
}
