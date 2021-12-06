import Art from "../../../../models/Art";
import "../../../../utils/dbConnect";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const arts = await Art.find({})
          .where("Status")
          .equals(true)
          .where("OnSale")
          .equals(true)
          .where("Auctioned")
          .equals(true)
          .limit(8)
          .sort({
            createdAt: "desc",
          });

        return res.status(200).json(arts);
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
