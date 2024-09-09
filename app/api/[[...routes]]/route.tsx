/** @jsxImportSource frog/jsx */

import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  title: "Creators of Farcast",
});

type Creator = {
  name: string;
  image: string;
  link: string;
};

const creators = [
  {
    name: "Jonathan Bell",
    image: "https://www.jonathanbell.ca/pictures/_MG_3954-Edit.jpg",
    link: "https://jonathanbell.ca",
  },
  {
    name: "John Doe",
    image:
      "https://media.istockphoto.com/id/2065674519/photo/rolling-says-macro.jpg?s=2048x2048&w=is&k=20&c=FO-u3p_njEoIh7GusFYgrOo1RxF0EXobx0BXH6vMB4Q=",
    link: "https://cats.com/",
  },
  {
    name: "Jane Doe",
    image:
      "https://cats.com/wp-content/uploads/2024/08/Red-Point-Siamese-Cats-540x360.jpg",
    link: "https://dogs.com/",
  },
  {
    name: "John Smith",
    image:
      "https://d3ftabzjnxfdg6.cloudfront.net/app/uploads/2021/07/4-Winds_6774-web-1024x658.jpg",
    link: "https://foo.com/",
  },
];

creators.forEach((creator: Creator, index, array) => {
  app.frame(`/${index === 0 ? "" : index}`, (context) => {
    return context.res({
      action: `/${index === array.length - 1 ? "" : index + 1}`,
      image: <img src={creator.image} alt={creator.name} />,
      intents: [
        <Button.Link href={creator.link}>{`${creator.name}`}</Button.Link>,
        <Button>
          👀 Next: {creators[index === array.length - 1 ? 0 : index + 1].name}
        </Button>,
      ],
    });
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
