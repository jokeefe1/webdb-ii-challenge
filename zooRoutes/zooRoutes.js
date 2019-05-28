const express = require('express');
const db = require('../data/zoo-model');
const router = express.Router();

//GET return all zoos in db
router.get('/', async (req, res) => {
    try {
        const allZoos = await db.find();
        res.json({
            message: `Successfully returned all zoos in the database`,
            allZoos
        });
    } catch (error) {
        res.status(500).json({
            error: `There was an error returning zoos from the database`
        });
    }
});

//GET find by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const zooById = await db.findById(id);
        res.json({ message: `Successfully found zoo with id ${id}`, zooId });
    } catch (error) {
        res.status(500).json({
            error: `There was a problem finding zoo with id ${id}`
        });
    }
});

//POST add new zoo
router.post('/', async (req, res) => {
    const { body } = req;
    if (!body.name) {
        res.status(400).json({ message: `A zoo name is required` });
    } else {
        try {
            const updatedZoo = await db.add(body);
            res.json({ message: 'Successfully added zoo', updatedZoo });
        } catch (error) {
            res.status(500).json({
                error: `There was a problem adding zoo to database`
            });
        }
    }
});

//DELETE remove zoo by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        const deletedZoo = await db.remove(id);
        res.status(400).json({ message: `A zoo id is required`, deletedZoo });
    } else {
        try {
            const deletedZoo = await db.remove(id)
            res.json({ message: `Successfully deleted zoo with id of ${id}`, deletedZoo });
        } catch (error) {
            res.status(500).json({ error: `There was a problem removing zoo with id ${id}`})
        }
    }
});

//PUT update zoo
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    if (!id || !body) {
        res.status(400).json({
            message: `An id and body are required`,
            id,
            body
        });
    } else {
        try {
            const updatedZoo = await db.update(id, body);
            res.status(201).json({
                message: `Successfully updated zoo with id ${id}`,
                updatedZoo
            });
        } catch (error) {
            res.status(500).json({
                error: `There was a problem updating zoo with id ${id}`
            });
        }
    }
});


module.exports = router;
