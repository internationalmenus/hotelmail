var express = require("express");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var mails = [
  {
    lastName: "lastname1",
    group: "groupName1",
    detail: "Example1",
    bundle: "1",
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
  var newmail = req.body;
  newmail.trackingNum = newmail.trackingNumber.replace(/\s+/g, "").toLowerCase();
  console.log(newmail);
  mails.push(newmail);
  res.json(newmail);

});


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});