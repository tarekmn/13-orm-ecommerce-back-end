const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const data = await Tag.findAll({
      // include: [{ model: Product }],
    });

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  // find all tags
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Tag.findByPk(req.params.id);

    if (!data) {
      res.status(404).json({ message: "No Tag found by this id!" });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }

  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  try {
    const data = await Tag.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }

  // create a new tag
});

router.put("/:id", async (req, res) => {
  Tag.update(
    {
      tag_name: req.body,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));

  // update a tag's name by its `id` value
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!data) {
      res.status(404).json({ message: "No Tag found by this id!" });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  // delete on tag by its `id` value
});

module.exports = router;
