import React, { ReactElement } from "react"
import { isSilverLine } from "../../helpers/silver-line"

import { Project } from "./Project"
import { Route } from "./Route"
import { RouteIcon } from "./RouteIcon"

export const MoreProjectsRow = ({image, path, title, routes, date}: Project): ReactElement<HTMLElement> => {
  const busTags = (routes: Route[]): string[] => {
    if(routes.find((route) => route.mode === "bus")) {
      return ["bus"]
    } else {
      return []
    }
  }

  const commuterRailTags = (routes: Route[]): string[] => {
    if(routes.find((route) => route.mode === "commuter_rail")) {
      return ["commuter_rail"]
    } else {
      return []
    }
  }

  const ferryTags = (routes: Route[]): string[] => {
    if(routes.find((route) => route.mode === "ferry")) {
      return ["ferry"]
    } else {
      return []
    }
  }

  const subwayTags = (routes: Route[]): string[] => {
    let result = [] as string[]

    if(routes.find((route) => route.id === "subway")) {
      result.push("subway")
    }

    if(routes.find((route) => route.id === "Blue")) {
      result.push("blue")
    }

    if(routes.find((route) => route.id === "Green")) {
      result.push("green")
    }

    let greenLineBranches = routes.filter((route) => route.id.match(/^Green-/))
    result = result.concat(greenLineBranches.map((route) => route.id.toLowerCase())).sort()

    if(routes.find((route) => route.id === "Mattapan")) {
      result.push("mattapan")
    }

    if(routes.find((route) => route.id === "Orange")) {
      result.push("orange")
    }

    if(routes.find((route) => route.id === "Red")) {
      result.push("red")
    }

    if(routes.find((route) => isSilverLine(route.id))) {
      result.push("silver")
    }

    return result
  }

  const routesToTags = (routes: Route[]): string[] => {
    return busTags(routes).concat(subwayTags(routes)).concat(ferryTags(routes)).concat(commuterRailTags(routes))
  }

  const formattedDate = (unformatted: string): string => {
    const [year, month, day] = unformatted.split(/-/).map((part) => Number.parseInt(part))
    
    // Remember that months in JS are 0-indexed for some reason, hence "month - 1".
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString("default", {'year': 'numeric', 'month': 'long', 'day': 'numeric'})
  }

  return(
    <tr className="c-more-projects-table__tr">
      <td className="c-more-projects-table__td c-more-projects-table__td-project">
        {image &&
          <img src={image.url} alt={image.alt} className="c-more-projects-table__thumbnail"></img>
        }

        <div className="c-more-projects-table__wrapper">
          <a className="c-more-projects-table__project-link" href={path}>{title}</a>
          <br/>

          {routesToTags(routes).map((tag) =>
            <RouteIcon key={tag} tag={tag}></RouteIcon>
          )}
        </div>
      </td>

      <td className="c-more-projects-table__td c-more-projects-table__td-last-updated">{formattedDate(date)}</td>

      <td className="c-more-projects-table__td"></td>
    </tr>
  )
}
