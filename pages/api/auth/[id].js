import Artist from "../../../models/Artist";
import "../../../utils/dbConnect";

export default  async (req, res) => {
	const {
		query: { id },
		method,
	} = req;

	switch (method) {
		case "GET":
			try {
				const artist = await Artist.find({});
            
				return res.status(200).json({
					success: true,
					data: artist,
				});
			} catch (error) {
				return res.status(404).json({
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
