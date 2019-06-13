import sg from '@sendgrid/mail';
import express from 'express';

const router = express.Router();

sg.setApiKey('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');

router.post('/send', (req, res) => {
  const msg = {
    to: 'nimish@pesto.tech',
    from: 'pkpratiyush@gmail.com',
    templateId: 'd-eebbbc406b0e476593228270678a38f4',
  };
  sg.send(msg).then(() => console.log('sent'));
});

export default router;
