import accessibleAutocomplete from 'accessible-autocomplete'

const sourceFn = (query, callbackFn) => {
    console.log({query});
    callbackFn([{result: "I see the query", data: query}]);
}

const inputTemplateFn = (selectedOption) => {
    console.log({selectedOption})
    return selectedOption?.result;
}

const suggestionTemplateFn = (suggestedOption) => {
    console.log({suggestedOption})
    return `<div><b>${suggestedOption.result}</b><br/><i>${suggestedOption.data}</i></div>`;
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