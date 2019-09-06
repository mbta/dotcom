import React, { ReactElement } from "react";
import FilterButton from "../../components/FilterButton";
import ModeIcon from "../../tnm/components/ModeIcon";

const SubwayFilter = (): ReactElement<HTMLElement> => (
  <div className="subway-filter">
    <div className="c-mode-filter__filter-btn-group">
      <FilterButton
        identifier={"red"}
        icon={<ModeIcon type="red_line" />}
        name={"Red Line"}
        isSelected={f => false}
        onClick={f => () => console.log(f)}
      />
      <FilterButton
        identifier={"orange"}
        icon={<ModeIcon type="orange_line" />}
        name={"Orange Line"}
        isSelected={f => false}
        onClick={f => () => console.log(f)}
      />
    </div>
    <div className="c-mode-filter__filter-btn-group">
      <FilterButton
        identifier={"blue"}
        icon={<ModeIcon type="blue_line" />}
        name={"Blue Line"}
        isSelected={f => false}
        onClick={f => () => console.log(f)}
      />
      <FilterButton
        identifier={"green"}
        icon={<ModeIcon type="green_line" />}
        name={"Green Line"}
        isSelected={f => false}
        onClick={f => () => console.log(f)}
      />
    </div>
    <div className="c-mode-filter__filter-btn-group">
      <FilterButton
        identifier={"mattapan"}
        icon={<ModeIcon type="mattapan_line" />}
        name={"Mattapan Line"}
        isSelected={f => false}
        onClick={f => () => f}
      />
    </div>
  </div>
);

export default SubwayFilter;
