import { urlmodel } from "../models/url.model.js";
import shortid from "shortid";

export const createShortUrl = async (req, res) => {
  const { originalUrl, expiryDays,custom } = req.body;

  try {
    const shortId = custom?.trim() ? custom.trim() :shortid.generate();

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + Number(expiryDays));
    const data = await urlmodel.create({
      originalUrl,
      shortId,
      expiryDate,
    });

    return res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${shortId}`,
      expiryDate: data.expiryDate,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const redirectUrl = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await urlmodel.findOne({ shortId });
    if (!url)
        {
            return res.status(404).json({ message: "URL not found" });
        }
    if (url.expiryDate < new Date())
    {
      return res.status(410).json({ message: "Link expired" });
    }
    url.clicks += 1;
    await url.save();
    res.redirect(url.originalUrl);
  } catch (error)
  {
    res.status(500).json({ message: "Server error" });
  }
};

