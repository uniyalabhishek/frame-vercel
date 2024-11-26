import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";

export const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  title: "Hello World Frame",
});

app.frame("/", (c) => {
  const { status, frameData } = c;
  const username = frameData?.fid ? `@${frameData.fid}` : "stranger";

  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "black",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            textAlign: "center",
          }}
        >
          {status === "response" ? `Hello ${username}!` : "Please Sign In"}
        </div>
      </div>
    ),
    intents: [
      <Button>Sign In with Farcaster</Button>,
      status === "response" && <Button.Reset>Reset</Button.Reset>,
    ],
  });
});

const isProduction = false;
devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
