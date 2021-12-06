import ArtLog from "../../../models/ArtLog";
import "../../../utils/dbConnect";

export default async (req, res) => {
	const {
		query: { id },
		method,
	} = req;

	switch (method) {
		case "GET":
			try {
				const artLogs = await ArtLog.find({ArtId:id}).sort({
				  createdAt: "desc",
				});
		
				return res.status(200).json(artLogs);
			  } catch (error) {
				return res.status(400).json({
				  success: false,
				});
			  }
		case "PUT":
			try {
				const artLog = await ArtLog.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				});

				return res.status(200).json({
					success: true,
					data: artLog,
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
				});
			}
		case "DELETE":
			try {
				await ArtLog.deleteOne({ _id: id });

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
