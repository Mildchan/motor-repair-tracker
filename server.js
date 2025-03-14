const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

// ตั้งค่า body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ตั้งเส้นทางสำหรับไฟล์ JSON
const filePath = './issues.json';

// API เพื่อบันทึกข้อมูล
app.post('/submit-issue', (req, res) => {
  const { companyName, issueDescription, issueDate } = req.body;
  const newIssue = { companyName, issueDescription, issueDate };

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log('Error reading file', err);
      return res.status(500).send('Error reading file');
    }

    let issues = [];
    if (data) {
      issues = JSON.parse(data);
    }

    issues.push(newIssue);

    fs.writeFile(filePath, JSON.stringify(issues, null, 2), (err) => {
      if (err) {
        console.log('Error writing to file', err);
        return res.status(500).send('Error writing to file');
      }
      res.send('Issue recorded successfully');
    });
  });
});

// API เพื่อดึงข้อมูลทั้งหมด
app.get('/get-issues', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log('Error reading file', err);
      return res.status(500).send('Error reading file');
    }

    let issues = [];
    if (data) {
      issues = JSON.parse(data);
    }
    res.json(issues); // ส่งข้อมูลทั้งหมดเป็น JSON
  });
});

// เริ่มเซิร์ฟเวอร์
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
