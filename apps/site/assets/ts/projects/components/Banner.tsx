import React, { ReactElement } from "react";
import { ProjectTeaserWithDate, Route } from "./__projects";

interface Props {
  banner: ProjectTeaserWithDate;
}

const toCSSClass = (name: string): string =>
  name
    .toLowerCase()
    .replace(" ", "-")
    .replace("_", "-");

export const cmsRouteToClass = (route: Route): string => {
  if (route.id === "Green") return "green-line";
  if (route.id === "silver_line") return "silver-line";
  if (route.id === "mattapan") return "mattapan";
  if (route.group === "custom" && route.mode === null) return "unknown";
  if (route.group === "custom") return toCSSClass(route.mode!);
  if (route.group === "mode" && route.id !== null) return toCSSClass(route.id);
  return "unknown";
};

const bannerRouteClass = ({ routes }: ProjectTeaserWithDate): string =>
  cmsRouteToClass(routes[0]);

const bannerBgClass = (banner: ProjectTeaserWithDate): string => {
  if (banner.routes.length === 0) return "u-bg--unknown";
  return bannerRouteClass(banner);
};

const bannerContentClass = (banner: ProjectTeaserWithDate): string =>
  `m-banner__content m-banner__content--default m-banner__content--left u-bg--${bannerBgClass(
    banner
  )}`;

const bannerUpdated = (
  banner: ProjectTeaserWithDate
): ReactElement<HTMLElement> => <span>updated {banner.formatted_date}</span>;

const BannerContent = ({ banner }: Props): ReactElement<HTMLElement> => (
  <div className={bannerContentClass(banner)}>
    <div className="m-banner__top">
      <h2 className="h2 m-banner__title m-banner__title--default">
        {banner.title}
      </h2>
    </div>
    <div className="m-banner__bottom">{bannerUpdated(banner)}</div>
  </div>
);

const Banner = ({ banner }: Props): ReactElement<HTMLElement> => (
  <a
    href={banner.path}
    className="m-banner m-banner--responsive m-banner--small-margin-top m-banner--default"
  >
    <div
      className="m-banner__image m-banner__image--responsive m-banner__image--default"
      style={{ backgroundImage: ` url(${banner.image.url})` }}
    >
      <div className="sr-only">{banner.image.alt}</div>
      <div className="container hidden-xs-down">
        <BannerContent banner={banner} />
      </div>
    </div>
    <div className="hidden-sm-up">
      <BannerContent banner={banner} />
    </div>
  </a>
);

export default Banner;
