import express from 'express';
import path from 'node:path';

const router = express.Router();

router.get('/*', (req, res) => {
  res.sendFile(path.resolve('front/dist/no-rpg', 'index.html'));
});

export default router;