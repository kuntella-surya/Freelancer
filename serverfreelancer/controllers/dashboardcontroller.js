export const getDashboard = (req, res) => {
  console.log(req.user)
    res.status(200).json({ message: `Hello, welcome ${req.user.email}` });
  };
  