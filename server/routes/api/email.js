import sendgrid from 'sendgrid';
import async from 'async';
import express from 'express';

const router = express.Router();

const helper = sendgrid.mail;

function sendEmail(parentCallback, fromEmail, toEmails, subject, textContent, htmlContent) {
  const errorEmails = [];
  const successfulEmails = [];
  const sg = sendgrid('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');
  async.parallel(
    [
      (callback) => {
        // Add to emails
        for (let i = 0; i < toEmails.length; i += 1) {
          // Add from emails
          const senderEmail = new helper.Email(fromEmail);
          // Add to email
          const toEmail = new helper.Email(toEmails[i]);
          // HTML Content
          const content = new helper.Content('text/html', htmlContent);
          const mail = new helper.Mail(senderEmail, subject, toEmail, content);
          const request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
          });
          sg.API(request, (error, response) => {
            console.log('SendGrid');
            if (error) {
              console.log('Error response received');
            }
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
          });
        }
        // return
        callback(null, true);
      },
    ],
    (err, results) => {
      console.log('Done');
    },
  );
  parentCallback(null, {
    successfulEmails,
    errorEmails,
  });
}

router.post('/api/send', (req, res, next) => {
  console.log('email hit');
  async.parallel(
    [
      (callback) => {
        sendEmail(
          callback,
          'pkpratiyush@gmail.com',
          ['rajatsrivastava20893@gmail.com'],
          'Subject Line',
          'Text Content',
          '<p style="font-size: 32px;">Hey Nimish!!</p>',
        );
      },
    ],
    (err, results) => {
      res.send({
        success: true,
        message: 'Emails sent',
        successfulEmails: results[0].successfulEmails,
        errorEmails: results[0].errorEmails,
      });
    },
  );
});

export default router;
