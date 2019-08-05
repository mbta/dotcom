import React, { ReactElement } from "react";
import { Banner, Route } from "./__projects";

interface Props {
  banner: Banner;
}

const BannerImage = ({
  banner: { banner_type, thumb }
}: Props): ReactElement<HTMLElement> => (
  <div
    className={`m-banner__image m-banner__image--${banner_type}`}
    style={{ backgroundImage: `url(${thumb.url}` }}
  >
    <div className="sr-only">{thumb.alt}</div>
  </div>
);

const bannerContentClass = (banner: Banner): string =>
  `m-banner_content m_banner-content--${banner.banner_type} m-banner__content-${
    banner.text_position
  } ${bannerBgClass(banner)}`;

const bannerBgClass = (banner: Banner): string => {
  if (banner.banner_type === "important") return "";
  if (banner.routes.length === 0) return "u-bg--unknown";
  return bannerRouteClass(banner);
};

const bannerRouteClass = ({ routes }: Banner): string => {
  return cmsRouteToClass(routes[0]);
};

const toCSSClass = (name: string): string =>
  name
    .toLowerCase()
    .replace(" ", "-")
    .replace("_", "-");

const cmsRouteToClass = (route: Route): string => {
  if (route.id === "Green") return "green-line";
  if (route.id === "silver_line") return "silver-line";
  if (route.id === "mattapan") return "mattapan";
  if (route.group === "custom" && route.mode === null) return "unknown";
  if (route.group === "custom") return toCSSClass(route.mode);
  if (route.group === "mode" && route.id !== null) return toCSSClass(route.id);
  return toCSSClass(route.id);
};

const bannerCTA = (banner: Banner) => {
  if (banner.banner_type !== "important" || banner.title === null) return null;
  return <span className="m-banner__cta">{banner.title}</span>;
};

const Banner = ({ banner }: Props): ReactElement<HTMLElement> => {
  return (
    <a
      href={banner.utm_url}
      className={`m-banner m-banner--${banner.banner_type}`}
    >
      <BannerImage banner={banner} />
      <div className="container">
        <div className={bannerContentClass(banner)}>
          <div className="m-banner__top">
            <div className="m-banner__category u-small-caps">
              {banner.category}
            </div>
            <h2
              className={`h2 m-banner__title m-banner__title--${
                banner.banner_type
              }`}
            >
              {banner.title}
            </h2>
            {banner.banner_type === "important" ? <p>banner.blurb</p> : null}
          </div>
        </div>
        <div className="m-banner__bottom">{bannerCTA(banner)}</div>
      </div>
    </a>
  );
};

export default Banner;
