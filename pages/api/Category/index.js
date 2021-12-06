import Category from "../../../models/Category";
import "../../../utils/dbConnect";

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				const Categories = await Category.find({}).sort({
					createdAt: "desc",
				});

				return res.status(200).json(Categories,
				);
			} catch (error) {
				return res.status(400).json({
					success: false,
				});
			}
		case "POST":
			try {
				const Categories = await Category.create(req.body);
				return res.status(201).json({
					success: true,
					data: Categories,
				});
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
