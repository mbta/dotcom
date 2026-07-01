import accessibleAutocomplete from 'accessible-autocomplete'

const sourceFn = (query, callbackFn) => {
    fetch("/search/query", {
        method: "POST",
        body: JSON.stringify({
            algoliaQuery: query,
            algoliaIndexesWithParams: [ { stops: { hitsPerPage:5 } } ]
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json( results => {
        console.log({results})
        callbackFn([{result: "I see the query", data: query}]);

    }))
    console.log({query});
}

const inputTemplateFn = (selectedOption) => {
    console.log({selectedOption})
    return selectedOption?.stop?.name;
}

const suggestionTemplateFn = (suggestedOption) => {
    console.log({suggestedOption})
    return `<div><b>${suggestedOption.stop.name}</b><br/><i>${suggestedOption.stop.type}</i></div>`;
}
export default ()=>{
    window.addEventListener("load", ()=>{
        setTimeout(()=>{
            Array.from(document.getElementsByClassName("stop_search-autcomplete_container")).forEach(elem => {
                    accessibleAutocomplete({
                        element: elem,
                        id: elem.getAttribute("id"),
                        source: sourceFn,
                        templates: {
                            inputValue: inputTemplateFn,
                            suggestion: suggestionTemplateFn
                        }
                    })
                
            })
        }, 3000);
    });
}