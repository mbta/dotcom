import axios from "axios";
import Logger from 'node-json-logger';

const axiosOptions = {
  headers: {
    "User-Agent": "Node",
  },
  method: "get",
  timeout: 1000,
};
const logger = new Logger();

export const status200 = async (options) => {
  let healthy = false;

  try {
    const res = await axios.request(Object.assign(axiosOptions, options));

    if (res.status === 200) {
      healthy = true;
    }
  } catch (e) {
    logger.error({ baseURL: options.baseURL, error: e.message });

    healthy = false;
  }

  return healthy;
};

export const fileToMetricName = (file) =>
  file.replace(/-/g, "_").replace(".js", "").toLowerCase();

// https://github.com/phoenixframework/phoenix_live_view/blob/5a9f0afa097e08124a2b76b29386ec92bd6bdcbc/test/e2e/utils.js#L8
export const syncLiveView = async (page, expect) => {
  const promises = [
    expect(page.locator(".phx-connected").first()).toBeVisible(),
    expect(page.locator(".phx-change-loading")).toHaveCount(0),
    expect(page.locator(".phx-click-loading")).toHaveCount(0),
    expect(page.locator(".phx-submit-loading")).toHaveCount(0),
  ];
  return Promise.all(promises);
};

export default {
  fileToMetricName,
  status200,
  syncLiveView
};
