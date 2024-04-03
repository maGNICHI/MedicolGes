const allUsers = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const keyword = req.query.search
      ? {
          $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const UsersByRole = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const users = await User.find({ ...keyword, role: { $in: ["admin", "initiator", "participative_member"] } });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}
const UsersById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId); // Use findById instead of find
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ success: { user } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

module.exports = { allUsers, UsersByRole, UsersById };



module.exports = { allUsers, UsersByRole, UsersById };
