const User = require('./models/User');

app.post('/register', async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, // Remember to hash passwords in real applications
    });
    await newUser.save();
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).send("Error creating user");
  }
});
