import axios from "axios";
import cheerio from "cheerio";
import { Request, Response } from "express";
import getCurrentDate from "../helpers/getCurrentDate";
import getText from "../helpers/getText";
import db from "../models";
import { IImage } from "../types";

export async function getImages(_: Request, res: Response) {
  try {
    const images = await db.Image.find({});
    return res.json(images);
  } catch (error) {
    return res.json(error);
  }
}

export async function getImage(req: Request, res: Response) {
  try {
    const image = await db.Image.findById(req.params._id);
    return res.json(image);
  } catch (error) {
    return res.json(error);
  }
}

export async function getPOD(_: Request, res: Response) {
  const url = "https://apod.nasa.gov/apod";

  try {
    const { data: archive } = await axios.get(`${url}/archivepix.html`);
    const $achieve = cheerio.load(archive);

    const links: any[] = [];
    $achieve("body > b > a").each((index: any, value: any) => {
      var link = $achieve(value).attr("href");
      if (index < 7) {
        links.push(link);
      }
    });

    const images: IImage[] = [];

    for (let i = 0; i < links.length; i++) {
      const { data } = await axios.get(`${url}/${links[i]}`);
      const $ = cheerio.load(data);

      const { month, day, year } = getCurrentDate();
      const date = `${month} ${day} ${year}`;

      const text = $("body").text().trim().replace(/\s+/g, " ").split(" ");

      const image = {
        src: `${url}/${$("img")[0].attribs.src}`,
        alt: `NASA picture of the day of ${date}`,
        name: getText(text, month, "Image", 2),
        description: "<p>" + getText(text, "Explanation:", "Status") + "</p>",
        creditedTo: getText(text, "Copyright:", "Explanation:"),
        author: getText(text, "editors:", "NASA"),
      };

      images.push(image);
    }

    await db.Image.insertMany(images);
    return res.json(images);
  } catch (error: any) {
    return res.json(error.message);
  }
}
