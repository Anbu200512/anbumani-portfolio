import Certificate from "../models/Certificate.js";

// Create
export const createCertificate = async (req, res) => {
  try {
    const newCertificate = new Certificate(req.body);
    await newCertificate.save();
    res.json({ success: true, data: newCertificate });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update
export const updateCertificate = async (req, res) => {
  try {
    const updated = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete
export const deleteCertificate = async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getCertificates = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const skip = (page - 1) * limit;

    const total = await Certificate.countDocuments();
    const certificates = await Certificate.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: certificates,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};