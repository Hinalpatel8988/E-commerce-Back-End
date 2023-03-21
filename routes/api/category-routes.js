const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

  // find all categories
  router.get('/', async (req, res) => {
    try {
      const data = await Category.findAll({
        include: { model: Product },
      });
      if (!data) {
        res.status(404).json({ message: 'No Category found!' });
        return;
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
});

  // find one category by its `id` value
  router.get('/:id', async (req, res) => {
    try {
      const categoryData = await Category.findByPk(req.params.id, {
        include: [{ model: Product}]
      });
      if (!categoryData) {
        res.status(404).json({ message: 'No Category with this id!' });
        return;
      }
      res.status(200).json(categoryData);
    } catch (error) {
      res.status(400).json(error);
    }
});

  // create a new category
  router.post('/', async (req, res) => {
    try {
      const newCategoryData = await Category.create({
        category_name: req.body.category_name,
      });
      res.status(200).json(newCategoryData);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  // update a category by its `id` value
  router.put('/:id', async (req, res) => {
    try {
      const updatedData = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
        });
      if (!updatedData) {
        res.status(404).json({ message: 'No Category with this id!' });
        return;
      }
      res.status(200).json(updatedData);
    } catch (error) {
      res.status(500).json(error);
    }
});

	// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
	  try {
		 const categorytoDelete = await Category.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!categorytoDelete) {
			res.status(404).json({ message: 'No Category found with that id!' });
			return;
		}
		res.status(200).json(categorytoDelete);
	} catch (error) {
		res.status(500).json(error);
	}
});


module.exports = router;
