
import { Request, Response } from 'express';
import PetsService from '../../services/pet/pet.service';

export class Controller {
    all(req: Request, res: Response): void {
        PetsService.all().then(r => res.json(r));
    }

    byId(req: Request, res: Response): void {
        PetsService.byId(req.params.id).then(r => {
            if (r) res.json(r);
            else res.status(404).end();
        });
    }

    async create(req: Request, res: Response): Promise<void> {
        const newPet = await PetsService.create({
            name: req.body.name,
            type: req.body.type
        })

        res.status(201).location(`/api/pets/${newPet.id}`).json(newPet);
    }

    async update(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const newPet = await PetsService.update({
            name: req.body.name,
            type: req.body.type
        })

        res.status(201).location(`/api/pets/${newPet.id}`).json(newPet);
    }
}

export default new Controller();