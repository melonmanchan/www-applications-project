const ua = require("useragent");
ua(true);

async function parseUserAgent(ctx, next) {
  try {
    const agent =
      ctx.request.header["user-agent"] || ctx.request.header["x-user-agent"];
    const userAgent = ua.parse(agent);

    userAgent.os;
    userAgent.device;

    const { family, major, minor, patch } = userAgent.toJSON();

    const browser = {
      family,
      major,
      minor,
      patch
    };

    const data = {
      browser,
      device: userAgent.device,
      os: userAgent.os,
      raw: agent
    };

    ctx.request.data = data;
  } catch (e) {
    console.log(e);
    ctx.request.data = {};
  }

  await next();
}

module.exports = parseUserAgent;
