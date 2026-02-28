const Manager = require('../models/managerModel');

exports.addManager = async (req, res) => {
    try {
        const { name, email, phone, salary, designation, status } = req.body;
        if (!name || !email || !salary || !designation)
            return res.status(400).json({ message: "Required fields missing" });

        const existing = await Manager.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email already exists" });

        const manager = new Manager({ name, email, phone, salary, designation, status });
        await manager.save();

        res.json({ message: "Manager added", manager });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getManagers = async (req, res) => {
    const managers = await Manager.find();
    res.json(managers);
};

exports.updateManager = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    data.updated_date = new Date();
    const manager = await Manager.findByIdAndUpdate(id, data, { new: true });
    if (!manager) return res.status(404).json({ message: "Manager not found" });
    res.json({ message: "Manager updated", manager });
};

exports.deleteManager = async (req, res) => {
    const { id } = req.params;
    const manager = await Manager.findByIdAndDelete(id);
    if (!manager) return res.status(404).json({ message: "Manager not found" });
    res.json({ message: "Manager deleted" });
};

exports.searchManager = async (req, res) => {
    const { name, email, phone } = req.query;
    const query = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (email) query.email = { $regex: email, $options: 'i' };
    if (phone) query.phone = { $regex: phone, $options: 'i' };

    const managers = await Manager.find(query);
    res.json(managers);
};

exports.paginateManagers = async (req, res) => {
    let { page = 1, limit = 5 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const managers = await Manager.find()
        .skip((page - 1) * limit)
        .limit(limit);
    res.json(managers);
};

exports.deleteMultipleManagers = async (req, res) => {
    const { ids } = req.body; // array of manager IDs
    if (!ids || !Array.isArray(ids)) return res.status(400).json({ message: "Provide an array of IDs" });

    await Manager.deleteMany({ _id: { $in: ids } });
    res.json({ message: "Managers deleted" });
};