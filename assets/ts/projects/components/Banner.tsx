import React, { ReactElement } from "react";
import { Teaser as Project, Route } from "../../__cms";
import { formattedDate } from "../../helpers/date";
import { routeToCSSClass } from "../../helpers/css";

interface Props {
  banner: Project | null;
  placeholderImageUrl: string;
}

export const cmsRouteToClass = (route: Route): string => {
  if (route.id === "Green") return "green-line";
  if (route.id === "silver_line") return "silver-line";
  if (route.id === "mattapan") return "mattapan";
  if (route.mode === "commuter_rail") return "commuter-rail";
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
  `c-banner__content c-banner__content--responsive-side-by-side c-banner__content--left u-bg--${bannerBgClass(
    banner
  )}`;

const bannerUpdated = (banner: Project): ReactElement<HTMLElement> => (
  <span className="c-banner__date">Updated {formattedDate(banner.date)}</span>
);

const BannerContent = ({
  banner
}: {
  banner: Project;
}): ReactElement<HTMLElement> => (
  <div className={bannerContentClass(banner)}>
    <div className="c-banner__top">
      <h2 className="c-banner__title c-banner__title--default">
        {banner.title}
      </h2>
    </div>
    <div className="c-banner__bottom">{bannerUpdated(banner)}</div>
  </div>
);

const bannerImageURL = (banner: Project, placeholderImageUrl: string): string =>
  banner.image ? banner.image.url : placeholderImageUrl;

const bannerImageAlt = (banner: Project): string =>
  banner.image ? banner.image.alt : "MBTA logo";

const BannerXS = ({
  banner,
  placeholderImageUrl
}: {
  banner: Project;
  placeholderImageUrl: string;
}): ReactElement<HTMLElement> => (
  <div className="hidden-sm-up">
    <div className="row">
      <div
        className="c-banner__image c-banner__image--responsive c-banner__image--default"
        style={{
          backgroundImage: `url(${bannerImageURL(banner, placeholderImageUrl)})`
        }}
      >
        <div className="sr-only">{bannerImageAlt(banner)}</div>
      </div>
      <BannerContent banner={banner} />
    </div>
  </div>
);

const BannerSideBySide = ({
  banner,
  placeholderImageUrl
}: {
  banner: Project;
  placeholderImageUrl: string;
}): ReactElement<HTMLElement> => (
  <div className="c-banner__image c-banner__image--responsive-side-by-side c-banner--responsive-no-margin c-banner__image--default">
    <BannerContent banner={banner} />
    <img
      className="c-banner__image--by-side"
      src={bannerImageURL(banner, placeholderImageUrl)}
      alt={bannerImageAlt(banner)}
    />
    <div className="sr-only">{bannerImageAlt(banner)}</div>
  </div>
);

const BannerSMUp = ({
  banner,
  placeholderImageUrl
}: {
  banner: Project;
  placeholderImageUrl: string;
}): ReactElement<HTMLElement> => (
  <div className="hidden-xs-down hidden-lg-up">
    <div className="row">
      <BannerSideBySide
        banner={banner}
        placeholderImageUrl={placeholderImageUrl}
      />
    </div>
  </div>
);

const BannerLGUp = ({
  banner,
  placeholderImageUrl
}: {
  banner: Project;
  placeholderImageUrl: string;
}): ReactElement<HTMLElement> => (
  <div className="hidden-md-down">
    <BannerSideBySide
      banner={banner}
      placeholderImageUrl={placeholderImageUrl}
    />
  </div>
);

const Banner = ({
  banner,
  placeholderImageUrl
}: Props): ReactElement<HTMLElement> | null => {
  if (!banner) {
    return null;
  }

  return (
    <>
      <h2 className="c-projects-header__subheader">Featured Projects</h2>
      <a
        href={banner.path}
        className="c-banner c-banner--responsive c-banner--lg-9 c-banner--no-margin-top c-banner--default"
      >
        <BannerXS banner={banner} placeholderImageUrl={placeholderImageUrl} />
        <BannerSMUp banner={banner} placeholderImageUrl={placeholderImageUrl} />
        <BannerLGUp banner={banner} placeholderImageUrl={placeholderImageUrl} />
      </a>
    </>
  );
};

export default Banner;
