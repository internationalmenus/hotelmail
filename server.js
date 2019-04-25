var express = require("express");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var mails = [
  {
    lastName: "lastName1",
    group: "groupName1",
    detail: "Example1",
    bundle: "1",
    employee: "firstName1",
    delivered: "10",
    trackingNum: "01",
    trackingNumber: "01",
    id: Date.now(),
    date: Date()
  },
  {
    lastName: "lastname2",
    group: "groupName2",
    detail: "Example2",
    bundle: "2",
    employee: "firstName2",
    delivered: "20",
    trackingNum: "02",
    trackingNumber: "02",
    id: Date.now(),
    date: Date()
  },
];

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/delivered", function(req, res) {
  res.sendFile(path.join(__dirname, "delivered.html"));
});

app.get("/all", function(req, res) {
  res.sendFile(path.join(__dirname, "all.html"));
});

app.get("/admin", function(req, res) {
  res.sendFile(path.join(__dirname, "admin.html"));
});

app.get("/api/mails", function(req, res) {
  
 return res.json(mails.sort(function(a, b) {
  return parseFloat(b.id) - parseFloat(a.id);
}));
});

app.get("/api/mails/:mail", function(req, res) {
  var chosen = req.params.mail;

  console.log(chosen);

  for (var i = 0; i < mails.length; i++) {
    if (chosen === mails[i].trackingNum) {
      return res.json(mails[i]);
    }
  }

  return res.json(false);
});



app.post("/api/mails", function(req, res) {
  var addmail = req.body;
  addmail.trackingNum = addmail.trackingNumber.replace(/\s+/g, "").toLowerCase();
  console.log(addmail);
  mails.push(addmail);
  res.json(addmail);

});

app.post("/api/mails", function(req, res) {
  var delivermail = req.body;
  delivermail.trackingNum = delivermail.trackingNumber.replace(/\s+/g, "").toLowerCase();
  console.log(delivermail);
  mails.push(delivermail);
  res.json(delivermail);

});


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});