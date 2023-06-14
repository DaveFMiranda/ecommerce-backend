const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// Finds all categories and includes their associated products
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Finds on category by its 'id' value and includes its associated products
router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new category
router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a category by its 'id' value
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name } = req.body;
    const categoryData = await Category.findByPk(id);

    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    await Category.update({ category_name }, { where: { id } });

    const updatedCategory = await Category.findByPk(id);
    res.status(200).json(updatedCategory);
  } catch (err) {
    {
      console.error(err);
    }
    res.status(500).json({ message: "Failed to update the category." });
  }
});

// Delete a category by its 'id' value
router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
