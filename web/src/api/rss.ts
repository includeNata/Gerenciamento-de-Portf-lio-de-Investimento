import Parser, { Item } from "rss-parser";

export default async function handler() {
  const parser = new Parser({
    customFields: {
      item: [["media:content", "media:content", { keepArray: true }]],
    },
  });

  try {
    const feed = await parser.parseURL("/proxy/rss");

    // Define a new type that extends Item from rss-parser
    type FeedItem = Item & { "content:encoded": string; image: unknown };

    const items = feed.items.map((item: FeedItem) => {
      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: item.description,
        image: item["content:encoded"],
      };
    });

    return items;
  } catch (error) {
    console.error("Erro ao processar o feed RSS:", error);
    res.status(500).json({ error: "Falha ao processar o feed RSS" });
  }
}
