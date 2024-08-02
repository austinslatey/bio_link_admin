const router = require("express").Router();
const { getAll, getById, create, updateById, deleteById, getByUsername } = require("../../controllers/link-controller");

// GET all links or links by username
router.get('/', async (req, res) => {
  const { username } = req.query;

  try {
    let links;
    if (username) {
      links = await getByUsername(username);
    } else {
      links = await getAll();
    }

    console.log(`Returning ${links.length} links`);
    res.status(200).json({ status: 'success', payload: links });
  } catch (err) {
    console.error('Error fetching links:', err);
    res.status(500).json({ status: 'error', msg: err.message });
  }
});

// GET a single link by ID
router.get('/:id', async (req, res) => {
  try {
    const payload = await getById(req.params.id);
    res.status(200).json({ status: 'success', payload: payload });
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Link creation request body:', req.body);

    const { username, linkTitle, url, icon, order } = req.body;

    // Verify the user before creating the link
    const userBefore = await getByUsername(username);
    console.log('User before link creation:', userBefore);

    // Log password hash before creation
    const userPasswordHashBefore = userBefore[0]?.user_id?.password;
    console.log('User password hash before link creation:', userPasswordHashBefore);

    const linkData = {
      username,
      linkTitle,
      url,
      icon,
      order
    };

    // Create the new link
    const newLink = await create(linkData);

    // Verify the user after creating the link
    const userAfter = await getByUsername(username);
    console.log('User after link creation:', userAfter);

    // Log password hash after creation
    const userPasswordHashAfter = userAfter[0]?.user_id?.password;
    console.log('User password hash after link creation:', userPasswordHashAfter);

    res.status(200).json(newLink);
  } catch (error) {
    console.error('Error creating link:', error);
    res.status(500).json({ status: 'error', msg: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const payload = await updateById(req.params.id, req.body, req.body.username);
    res.status(200).json({ status: 'success', payload: payload });
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const payload = await deleteById(req.params.id, req.body.username);
    res.status(200).json({ status: 'success', payload: payload });
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message });
  }
});

module.exports = router;
