import Parser from "rss-parser";

export default async function handler() {
  const parser = new Parser({
    customFields: {
      item: [["media:content", "media:content", { keepArray: true }]],
    },
  });

  try {
    const feed = await parser.parseURL("/proxy/rss");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = feed.items.map((item: any) => {
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
  }
}
