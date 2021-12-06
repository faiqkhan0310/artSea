import Art from "../../../../models/Art";
import "../../../../utils/dbConnect";

export default async (req, res) => {
  const {
    query: { id,limit,skip },
    method,
  } = req;
console.log(id,limit,skip);
  switch (method) {
    case "GET":
      try {
        const totalRecords = await Art.countDocuments({ Category: id, Status: true, OnSale: true, NFTId: { $ne: null } });
        const posts = await Art.find({ Category: id })
          .where("Status")
          .equals(true)
          .where("OnSale")
          .equals(true)
          .where("NFTId")
          .ne(null)
          .sort({
            createdAt: "desc",
          })
          .limit(parseInt(req.query.limit) || 20)
          .skip(parseInt(req.query.limit) * (parseInt(req.query.skip) - 1));
        return res.status(200).json({posts,totalRecords});
      } catch (error) {
        return res.status(404).json({
          success: false,
        });
      }
    case "PUT":
      try {
        const art = await Art.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        return res.status(200).json({
          success: true,
          data: art,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case "DELETE":
      try {
        await Art.deleteOne({ _id: id });

        return res.status(200).json({
          success: true,
          data: { id },
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    default:
      res.setHeaders("Allow", ["GET", "PUT", "DELETE"]);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
};
