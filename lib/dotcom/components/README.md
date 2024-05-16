# Components

This is a suite of functionality that was created to help ensure that our styleguide is followed accurately and consistently. We are still experimenting heavily with the MBTA.com 3.0, and we expect things to change a lot over the coming months. Having our components defined as an API enables us to make changes in one spot and have them be applied automatically across the site, thus minimizing the effort required to refactor. When change is easy, it not only helps us move faster, but it also gives us the freedom to take more risks and try interesting things that we might not otherwise be willing to take on.

## Architecture
Calling `use Dotcom.Components.Precompiler` in a view makes all components available to the templates within that view (Precompiler gets called in `DotcomWeb.view`, so it's applied by default for all views). The Precompiler adds a macro that runs through these basic steps at compile time:
- For each top level folder as `component_group` in `libdotcom/components`, do:
    - For each subfolder as `component` in `component_group`, define:
        - `component`/1 :: html

All components take one argument, a map, which is derived from the component's `struct`. All components' argument map will have keys for `:class` and `:id`; review the documentation for what other arguments are available for each component.

## Calling a Component inside a template
Any component can be called from any template. So, to add a ModeButtonList to a page, simply call `mode_button_list(Dotcom.Components.Buttons.ModeButtonList%{ routes: @routes })`. (Yes, that struct is clunky -- would like to clean that up.)

## The Style Guide (and the "Single Source of Truth" Philosophy)
Another advantage of having our components defined as an API is that documenting a component is "baked in" with the process of writing it. Our goal is to, whenever possible, define things in one place and use that as the Single Source of Truth. Not only does this make our code as DRY as possible, it also helps to keep our styling consistent, and it ensures that our style guide is always up-to-date.

When the app is compiled, `StyleGuideController` calls `use Components.Register` to set

`@components` :: `[ {:section, [:component_1, :component_2]} ]`

The controller then uses this list to build out the UI Components page with subpages for each `:section` that has a list of all `:components` within that section. For each component, the style guide displays:
- A rendered version of the component, using its default arguments
- The underlying HTML of the component
- The function to call the component, showing its arguments
- The contents of the moduledoc for the component's module.

The UI Components section of the style guide also has two non-component pages:
- Typography -- fully static content, editable at `/lib/dotcom_web/templates/style-guide/_typography.html`
- Colors -- dynamically populated with all color variables.

### Color Variables
Color variables are read from `assets/css/colors.json`. There is no permanent `colors.scss` file. Instead, `brunch-config.js` calls `var compiler = require(css-styleguide-compiler-brunch)`, and includes 2 hooks:
1. `preCompile`
    - Runs before the CSS is compiled.
    - Calls `compiler.compile()` -- reads any JSON files in the css folder and writes the variable definitions into SCSS files in the CSS folder, thus making them available to be compiled with the rest of the SCSS files.
2. `onCompile`:
    - Runs after the CSS has been compiled
    - Calls `compiler.teardown()`, which deletes the generated SCSS files.

Using this method ensures that any time a new color variable is added, it is automatically added to the style guide. The JSON file acts as the Single Source of Truth for what colors we have in our app.

At the moment this is only being used for color variables, but it was written such that it will generate SCSS files from and JSON file in the CSS folder. It could potentially be used for things like font sizes, margins, paddings...

## Shoutout
The architecture for this system was inspired by the [Rizzo styleguide](http://rizzo.lonelyplanet.com) created by Lonely Planet. [Styleguides.io](http://www.styleguides.io) is also an invaluable resource library for anyone interested in building a styleguide of their own from the ground up.
