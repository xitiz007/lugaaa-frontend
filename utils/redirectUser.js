import Router from "next/router";

const redirectUser = (ctx, path) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: path }).end();
  } else {
    Router.push(path);
  }
};

export default redirectUser;
