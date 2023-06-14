const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// Finds all tags, including associated product data
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Finds a single tag by its 'id', including associated product data
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates a new tag
router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Updates a tag's name by its 'id' value
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { tag_name } = req.body;
    const tagData = await Tag.findByPk(id);

    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    await Tag.update({ tag_name }, { where: { id } });

    const updatedTag = await Tag.findByPk(id);
    res.status(200).json(updatedTag);
  } catch (err) {
    {
      console.error(err);
    }
    res.status(500).json({ message: "Failed to update the category." });
  }
});

// Deletes a tag by its 'id' value
router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
