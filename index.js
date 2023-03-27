//HeirloomCss v0.2
//24 March 2023
//Stable release

//Gets css properties of a class, id or element as defined in a style sheet
function getCssproperties(cls) {
    let sheets, sheet, allProps
    //All style sheets
    sheets = document.styleSheets
    allProps = []
    
    for (sheet of sheets) {
        let rules, rule
        //The style sheet css rules
        rules = sheet.cssRules
        for (rule of rules) {
            let ruleMap, name, props
            //Creates a rule map of name and properties
            ruleMap = rule.cssText
            ruleMap = ruleMap.split(" ")
            name = ruleMap[0]
            ruleMap = ruleMap.splice(1, ruleMap.length - 1)
            props = ruleMap.join("")
            //Rule map
            ruleMap = {name: name, props: props}
            //If ruleMap.name is the same variable as passed onto the mother function//
            //Then convert ruleMap.properties into valid JSON
            //And add it into allProps array//
            if (ruleMap.name == cls) {
                let data = ""
                for (let i = 1; i < ruleMap.props.length - 1; i++) {
                    data += ruleMap.props[i]
                }
    
                data = data.split(";")
                    
                data.forEach(singleData => {
                singleData = singleData.split(":")
                allProps.push({name: singleData[0], value: singleData[1]})
                })
            }
        }
    }

    return allProps
}

function styleElement (elem, prop) {
    elem.style.setProperty(prop.name, prop.value)
}

function removeWhiteSpace (string) {
    let cString = ""

    for (let i = 0; i < string.length; i++) {
        let char = string[i]

        if (char == " " || char == '"' || char == "'") {
            cString += ""
        } else {
            cString += char
        }
        
    }

    return cString
}

function replaceAll (string, key) {
    for (let i = 0; i < string.length; i++) {
        string = string.replace(key)
    }

    return string
}

function empty (string) {
    if (string == "") {
        return true
    } else {
        return false
    }
}
//Inherits classes
function inheritClass (elem) {
    function getClasses () {
        let cls = elem.classList
        findInheritProp(cls)
    }

    function findInheritProp(cls) {
        let recordedProps, reccedProps, dominantProps
        recordedProps = []
        reccedProps = []
        dominantProps = []
        //Get properties
        cls.forEach (cl => {
            let propMap
            propMap = getCssproperties(`.${cl}`)
            //If style properties includes --inheirt
            if (propMap.some(prop => prop.name == '--inherit')) {
                let inhPropValues
                inhPropValues = propMap.find(prop => prop.name == '--inherit')
                //Cleaning
                inhPropValues.value = removeWhiteSpace(inhPropValues.value)
                inhPropValues.value = inhPropValues.value.split(',')
                //If array is not empty
                if (inhPropValues.value != []) {
                    //Each selector
                    inhPropValues.value.forEach(inhSel => {
                        let selProp = getCssproperties(inhSel)
                        recordedProps = recordedProps.concat(selProp)
                    })
                    //Filtering
                    //Receeds
                    if (propMap.some(singleMap => singleMap.name == '--receed')) {
                        let rcdPrps = propMap.find(singleMap => singleMap.name == '--receed')
                        //Cleaning
                        rcdPrps.value = removeWhiteSpace(rcdPrps.value)
                        rcdPrps.value = rcdPrps.value.split(',')
                        //Concatinating
                        reccedProps = reccedProps.concat(rcdPrps.value)
                        
                    }
                    //Domination
                    if (propMap.some(singleMap => singleMap.name == '--dominant')) {
                        let rcdPrps = propMap.find(singleMap => singleMap.name == '--dominant')
                        //Cleaning
                        rcdPrps.value = removeWhiteSpace(rcdPrps.value)
                        rcdPrps.value = rcdPrps.value.split(',')
                        //Concatinating
                        dominantProps = reccedProps.concat(rcdPrps.value)     
                    }
                }
        
            }
            
        })

        filterProps (recordedProps, reccedProps, dominantProps)
    }

    function filterProps (allProps, receeds, dominations) {
        //Recessiveness
        function compare () {
            if (allProps != []) {
                //Domination
                if (dominations.length > 0) {
                    let selProps = []

                    dominations.forEach(dom => {
                        if (allProps.some(prp => prp.name == dom)) {
                            let selProp = allProps.find(prp => prp.name == dom)
                            selProps.push(selProp)
                        }
                    })

                    allProps = selProps
                    //Recessiveness
                } else if (receeds.length > 0) {
                    receeds.forEach(rcd => {
                        allProps = allProps.filter(property => property.name != rcd)

                    })
                }
                
            }
            setProps()
        }

        function setProps () {
            allProps.forEach(prp => {
                styleElement(elem, prp)
            })
        }
        compare()
    }

    getClasses()
}
//Listens for any additions in the document
function listenAdditions () {
    // Select the document's body element
    const bodyElement = document.body;

    // Create a new MutationObserver object
    const observer = new MutationObserver(function(mutationsList) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            for (let addedNode of mutation.addedNodes) {
                if (addedNode.nodeType === Node.ELEMENT_NODE) {
                    scan()
                    inheritClass(addedNode)
                }
            }
        }
    }
    });

    // Start observing the body element for additions to its child nodes
    observer.observe(bodyElement, { childList: true, subtree: true });
}
//Scans all elements and sets mutations
function scan () {
    let all = document.querySelectorAll('*')

    all.forEach (elem => {
        // Create a new MutationObserver object
        const observer = new MutationObserver(function(mutationsList) {
            for (let mutation of mutationsList) {
              if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                inheritClass(elem)
              }
            }
          });
          // Start observing the target element for changes to the style attribute
          observer.observe(elem, { attributes: true, attributeFilter: ['style'] });
    })

    console.log(`Scan complete at ${new Date().toTimeString()}`)
}
//Changes
function onloadInherit () {
    let all = document.querySelectorAll('*')

    all.forEach(elem => {
        inheritClass(elem)
    })
}

scan()
listenAdditions()
onloadInherit()