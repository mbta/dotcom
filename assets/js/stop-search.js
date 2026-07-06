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
    }).then(response => response.json().then( results => {
        const trimmedResults = results.results.map( (result) => {
            return {
                name: result.stop.name,
                stop_id: result.stop.id,
                latitude: result._geoloc.lat,
                longitude: result._geoloc.lng,
                type: 'MBTA',
                city: result.stop.municipality,
            }
        });
        callbackFn(trimmedResults);

    }))
}

const inputTemplateFn = (selectedOption) => {
    if(!selectedOption){return ""}
    console.log({selectedOption})
    return selectedOption?.name;
}

const suggestionTemplateFn = (suggestedOption) => {
    if(suggestedOption.type=='MBTA'){return suggestionMBTA(suggestedOption);}
    console.log(suggestedOption);
    return `<div><b>${suggestedOption.name}</b></div>`;
}

const featureIcons = (suggestedOption) => {
    return "🐄"
}

const suggestionMBTA = (suggestedOption) => {
    return `
<div class='stop_search--autocomplete_suggestion'>
    <img src='/icon-svg/icon-circle-t-small.svg' style='width:1em;height:1em;margin-top:-1em;'/>
    <div class='aa-ItemContentTitle flex-grow font-normal'>${suggestedOption.name}</div>
    <div class="mt-2 mb-1 flex justify-between items-center">
        <div class="flex gap-1">${featureIcons(suggestedOption)}</div>
        <div class="text-nowrap text-gray-500 text-sm font-normal">${suggestedOption.city}, MA</div>
    </div>
</div>
    `
}

const handleConfirm = (confirmedOption, elem) => {
    const inputId = elem.id.replace("--","_")+"_0_";
    if(!confirmedOption){
        /*document.getElementById(inputId+"latitude").value = "";
        document.getElementById(inputId+"longitude").value = "";
        document.getElementById(inputId+"name").value = "";
        document.getElementById(inputId+"stop_id").value = "";*/
    }else{
        document.getElementById(inputId+"latitude").value = confirmedOption.latitude;
        document.getElementById(inputId+"longitude").value = confirmedOption.longitude;
        document.getElementById(inputId+"name").value = confirmedOption.name;
        document.getElementById(inputId+"stop_id").value = confirmedOption.stop_id;
    }
    elem.blur()
    setTimeout(()=>{document.getElementById(elem.id+"__listbox").innerHTML = "";},10);
    
    
}

const idConvert = (elem)=>{
    return elem.getAttribute("id").replace("--","_")+"_0_";
}

const getHiddenInput = (elem, id_suffix) =>{
    return document.getElementById(elem.getAttribute("id").replace("--","_")+"_0_"+id_suffix);
}

export default ()=>{
    window.addEventListener("load", ()=>{
        setTimeout(()=>{
            Array.from(document.getElementsByClassName("stop_search-autcomplete_container")).forEach(elem => {
                console.log(document.getElementById(elem.getAttribute("id").replace("--","_")+"_0_name"))   
                accessibleAutocomplete({
                        confirmOnBlur: true,
                        defaultValue: {
                            name: getHiddenInput(elem, "name").value,
                            stop_id: getHiddenInput(elem, "stop_id").value,
                            latiitude: getHiddenInput(elem, "latitude").value,
                            longitude: getHiddenInput(elem, "longitude").value,
                            type: 'MBTA'
                        },
                        element: elem,
                        displayMenu: "overlay",
                        id: elem.getAttribute("id"),
                        menuClasses: "stop_search-autocomplete_ul",
                        minLength: 3, 
                        onConfirm: (confirmedOption) => handleConfirm(confirmedOption, elem),
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