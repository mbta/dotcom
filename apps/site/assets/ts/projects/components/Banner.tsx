import React, { ReactElement } from "react";
import { SimpleProject as Project, Route } from "./__projects";
import { formattedDate } from "../../helpers/date";
import { routeToCSSClass } from "../../helpers/css";

interface Props {
  banner: Project;
  placeholderImageUrl: string;
}

export const cmsRouteToClass = (route: Route): string => {
  if (route.id === "Green") return "green-line";
  if (route.id === "silver_line") return "silver-line";
  if (route.id === "mattapan") return "mattapan";
  if (route.group === "custom" && route.mode === null) return "unknown";
  if (route.group === "custom") return routeToCSSClass(route.mode!);
  if (route.group === "mode" && route.id !== null)
    return routeToCSSClass(route.id);
  if (route.group === "line") return `${routeToCSSClass(route.id)}-line`;
  return "unknown";
};

const bannerRouteClass = ({ routes }: Project): string =>
  cmsRouteToClass(routes[0]);

const bannerBgClass = (banner: Project): string => {
  if (banner.routes.length === 0) return "u-bg--unknown";
  return bannerRouteClass(banner);
};

const bannerContentClass = (banner: Project): string =>
  `m-banner__content m-banner__content--responsive-side-by-side m-banner__content--left u-bg--${bannerBgClass(
    banner
  )}`;

const bannerUpdated = (banner: Project): ReactElement<HTMLElement> => (
  <span className="m-banner__date">Updated {formattedDate(banner.date)}</span>
);

const BannerContent = ({
  banner
}: {
  banner: Project;
}): ReactElement<HTMLElement> => (
  <div className={bannerContentClass(banner)}>
    <div className="m-banner__top">
      <h2 className="h2 m-banner__title m-banner__title--default">
        {banner.title}
      </h2>
    </div>
    <div className="m-banner__bottom">{bannerUpdated(banner)}</div>
  </div>
);

const bannerImageURL = (banner: Project, placeholderImageUrl: string): string =>
  banner.image ? banner.image.url : placeholderImageUrl;

const Banner = ({
  banner,
  placeholderImageUrl
}: Props): ReactElement<HTMLElement> => (
  <a
    href={banner.path}
    className="m-banner m-banner--responsive m-banner--responsive-lg-margin m-banner--small-margin-top m-banner--default"
  >
    <div className="hidden-xs-down">
      <div className="m-banner__image m-banner__image--responsive-side-by-side m-banner__image--default">
        <BannerContent banner={banner} />
        {(banner.image && (
          <img
            className="m-banner__image--by-side"
            src={banner.image.url}
            alt={banner.image.alt}
          />
        )) || (
          <img
            className="m-banner__image--by-side"
            src={placeholderImageUrl}
            alt="MBTA logo"
          />
        )}
      </div>
    </div>
    <div className="hidden-sm-up">
      <div
        className="m-banner__image m-banner__image--responsive m-banner__image--default"
        style={{
          backgroundImage: ` url(${bannerImageURL(
            banner,
            placeholderImageUrl
          )})`
        }}
      />
      <BannerContent banner={banner} />
    </div>
  </a>
);

export default Banner;
