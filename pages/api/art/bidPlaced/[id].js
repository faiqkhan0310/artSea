import Bid from "../../../../models/Bid";
import Art from "../../../../models/Art";
import "../../../../utils/dbConnect";

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const bids = await Bid.find({ PublicAddress: id }).sort({
          createdAt: "desc",
        });

        let artsArray = [];

        for (let index = 0; index < bids.length; index++) {
          const bidItem = bids[index];

          const { ArtId } = bidItem;
          const artObj = await Art.findById(ArtId)
            .where("Auctioned")
            .equals(true);
          if (artObj) {
            artsArray.push(artObj);
          }
        }

        return res.status(200).json(artsArray);
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case "PUT":
      try {
        const bid = await Bid.findOneAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        }).sort({
          createdAt: "desc",
          Bid: -1,
        });

        return res.status(200).json({
          success: true,
          data: bid,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case "DELETE":
      try {
        await Bid.deleteOne({ _id: id });

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
