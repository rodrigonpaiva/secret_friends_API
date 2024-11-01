import { RequestHandler } from "express";
import * as people from '../services/people'
import { z } from "zod";
import { error } from "console";
import { decryptMatch } from "../utils/match";

export const getAll: RequestHandler = async (req, res) => {
    const {id_event, id_group} = req.params;
    
    const items = await people.getAll({
        id_event: parseInt(id_event),
        id_group: parseInt(id_group)
    });
    if(items) return res.json({ people: items });

    res.json({error: 'Houston, we have a problem!!!'})
}

export const getPerson: RequestHandler = async (req, res) => {
    const {id, id_event, id_group } = req.params;
    
    const personItem = await people.getPerson({
        id: parseInt(id),
        id_event: parseInt(id_event),
        id_group: parseInt(id_group)
    });
    if(personItem) return res.json({ person: personItem });

    res.json({error: 'Houston, we have a problem!!!'})
}

export const addPerson: RequestHandler = async (req, res) => {
    const {id_event, id_group} = req.params;
    
    const addPersonSchema = z.object({
        name: z.string(),
        email: z.string().email()
    })
    const body = addPersonSchema.safeParse(req.body);
    if(!body.success) return res.json({ error: 'Invalid data' });

    const newPerson = await people.add({
        name: body.data.name,
        email: body.data.email,
        id_event: parseInt(id_event),
        id_group: parseInt(id_group)
    });
    if (newPerson) return res.status(201).json({ person: newPerson });

    res.json({error: 'Houston, we have a problem!!!'})
}

export const updatePerson: RequestHandler = async (req, res) => {
    const {id, id_event, id_group} = req.params;
    
    const updatePersonSchema = z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        matched: z.string().optional()
    })
    const body = updatePersonSchema.safeParse(req.body);
    if(!body.success) return res.json({ error: 'Invalid data' });

    const updatedPerson = await people.update({
        id: parseInt(id),
        id_event: parseInt(id_event),
        id_group: parseInt(id_group)
    }, body.data);

    if (updatedPerson) {
        const personItem = await people.getPerson({
            id: parseInt(id),
            id_event: parseInt(id_event)
        })
        return res.json({ person: personItem });
    }

    res.json({error: 'Houston, we have a problem!!!'});
}

export const deletePerson: RequestHandler = async (req, res) => {
    const {id, id_event, id_group} = req.params;
    
    const deletedPerson = await people.remove({
        id: parseInt(id),
        id_event: parseInt(id_event),
        id_group: parseInt(id_group)
    });

    if (deletedPerson) return res.json({ person: deletedPerson });

    res.json({error: 'Houston, we have a problem!!!'});
}

export const searchPerson: RequestHandler = async (req, res) => {
    const { id_event } = req.params;

    const searchPersonSchema = z.object({
        email: z.string().email()
    });
    const query = searchPersonSchema.safeParse(req.query);
    if(!query.success) return res.json({ error: 'Invalid data' });

    const personItem = await people.getPerson({
        email: query.data.email,
        id_event: parseInt(id_event)
    });
    if(personItem && personItem.matched){
        const matchId = decryptMatch(personItem.matched);

        const personMatched = await people.getPerson({
            id: matchId,
            id_event: parseInt(id_event)
        });

        if(personMatched){ 
            return res.json({ 
                person: {
                    id: personItem.id,
                    name: personItem.name
                },
                personMatched: {
                    id: personMatched.id,
                    name: personMatched.name
                }  
            })
        };
    } 
    
    res.json({ error: 'Person not found' });
}