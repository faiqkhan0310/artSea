import Art from "../../../models/Art";
import "../../../utils/dbConnect";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const totalRecords = await Art.countDocuments({ Status: true, OnSale: true, NFTId: { $ne: null } });
        const arts = await
          Art.find({ Status: true, OnSale: true, NFTId: { $ne: null } })
            .sort({ '_id': -1 })
            .limit(parseInt(req.query.limit) || 20)
            .skip(parseInt(req.query.limit) * (parseInt(req.query.skip) - 1))
            .exec()
            return res.status(200).json({ arts, totalRecords });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case "POST":
      try {
        const arts = await Art.create(req.body);

        return res.status(201).json(arts);
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    default:
      res.setHeaders("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
};
