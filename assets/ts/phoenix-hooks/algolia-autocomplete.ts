/* eslint-disable no-param-reassign */
import { ViewHook } from "phoenix_live_view";
import setupAlgoliaAutocomplete from "../ui/autocomplete";
import {
  Item,
  LocationItem,
  StopItem
} from "../ui/autocomplete/__autocomplete";
import { Stop } from "../__v3api";

function valueFromData(data: Partial<Item>, fieldName: string): string {
  if (fieldName === "name") {
    return (
      (data[fieldName as keyof Item] as string) ||
      (data as LocationItem).formatted ||
      (data as StopItem).stop?.name ||
      ""
    );
  }
  return (
    (data[fieldName as keyof Item] as string) ||
    ((data as StopItem).stop
      ? ((data as StopItem).stop![fieldName as keyof Stop] as string)
      : "") ||
    ""
  );
}

function fieldNameFromInput(inputEl: HTMLInputElement): string | undefined {
  return inputEl.name.match(/((name|latitude|longitude|stop_id)+)/g)?.at(-1);
}
const AlgoliaAutocomplete: Partial<ViewHook> = {
  mounted() {
    const hook = (this as unknown) as ViewHook;

    if (hook.el) {
      const pushToLiveView = (data: Partial<Item>): void => {
        hook.pushEventTo(hook.el, "autocomplete_change", data);
        // hook.pushEvent("autocomplete_change", {
        //   id: hook.el.id,
        //   ...data
        // });
      };

      setupAlgoliaAutocomplete(hook.el, pushToLiveView);
    }
  }
};

export default AlgoliaAutocomplete;
