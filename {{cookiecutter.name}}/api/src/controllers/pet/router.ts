import { Request, Response } from "express";
import ps from "../../services/pet/pet.service";

export class Controller {
  public static all(req: Request, res: Response): void {
    ps.all().then(r => res.json(r));
  }

  public static byId(req: Request, res: Response): void {
    ps.byId(req.params.id).then(r => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  public static async create(req: Request, res: Response): Promise<void> {
    const newPet = await ps.create({
      name: req.body.name,
      type: req.body.type
    });

    res
      .status(201)
      .location(`/api/pets/${newPet.id}`)
      .json(newPet);
  }

  public static async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const newPet = await ps.update(id, {
      name: req.body.name,
      type: req.body.type
    });

    if (!newPet) {
      res.status(404).end(`${id} not found`);
      return;
    }

    res
      .status(201)
      .location(`/api/pets/${newPet.id}`)
      .json(newPet);
  }
}

export default new Controller();
