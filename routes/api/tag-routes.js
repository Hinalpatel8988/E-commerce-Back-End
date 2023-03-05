const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
		const data = await Tag.findAll({
			include: [{ model: Product, through: ProductTag }],
		});
		if (!data) {
			res.status(404).json({ message: 'No tags with this id found!' });
			return;
		}
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
		const data = await Tag.findByPk(req.params.id,{
			include: [{ model: Product, through: ProductTag}],
		});
		if (!data) {
			res.status(404).json({ message: 'No tag with this id found!' });
			return;
		}
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTagData = await Tag.create({
      product_id: req.body.product_id,
    });
    if (!newTagData) {
      res.status(404).json({ message: 'No Tag with this id!' });
			return;
		}
		res.status(200).json(newTagData);
	} catch (error) {
		res.status(400).json(error);
	}
});

router.put('/:id', async (req, res) => {
	// update a tag's name by its `id` value
	try {
		const updateTag = await Tag.update(
			{ tag_name: req.body.tag_name },
			{
				where: {
					id: req.params.id,
				},
			});
		if (!updateTag) {
			res.status(404).json({ message: 'No Tag found with this id!' });
			return;
		}
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json(error);
	}
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
	const tagtoDelete = await Tag.destroy({
	   where: {
		   id: req.params.id,
	   },
   });
   if (!tagtoDelete) {
	   res.status(404).json({ message: 'No Tag found with that id!' });
	   return;
   }
   res.status(200).json(tagtoDelete);
} catch (error) {
   res.status(400).json(error);
}
});

module.exports = router;
