// // To use module css with or without global classes
export const allClass = (parameter1, parameter2, parameter3) => {
    let globalClasses, mdlClasses, mdl
    let concatClassesStr = "", globalClassesStr = "", mdlClassesStr = ""

    const handleGlobalClassesValue = (globalClasses) => {
        // global classes
        if (typeof globalClasses === 'string' && globalClasses !== null && globalClasses) {
            globalClassesStr = globalClasses
        }
    }

    const handleModuleClassesVlaue = (mdlClasses, mdl) => {
        // converting mdlClasses i.e. normal class string into module classes string i.e. module class format string
        if (typeof mdlClasses === 'string' && mdlClasses !== null && mdlClasses) {
            if (typeof mdl === 'object' && mdl !== null && mdl) {
                let classesList = mdlClasses.split(" ");
                let mdlClassesList = [];
                classesList && classesList[0] && classesList.map((element) => {
                    if (mdl[element]) {
                        mdlClassesList.push(mdl[element]);
                    }
                })
                mdlClassesStr = mdlClassesList.join(" "); // class string with module class format
            }
        }
    }

    if (parameter1 !== undefined && parameter2 !== undefined && parameter3 !== undefined) {
        // // e.g. allClass("globalClassesString", "moduleClassesString", mdlObject)
        // // first parameter is global class string & second parameter is module class string & third parameter is module class object
        globalClasses = parameter1
        mdlClasses = parameter2
        mdl = parameter3
        handleGlobalClassesValue(globalClasses)
        handleModuleClassesVlaue(mdlClasses, mdl)
    }
    else if (parameter1 !== undefined && parameter2 !== undefined && parameter3 === undefined) {
        // // e.g. allClass("moduleClassesString", mdlObject)
        // // first parameter is module class string & second parameter is module class object
        mdlClasses = parameter1
        mdl = parameter2
        handleModuleClassesVlaue(mdlClasses, mdl)
    }
    else if (parameter1 !== undefined && parameter2 === undefined && parameter3 === undefined) {
        // // e.g. allClass("globalClassesString")
        // // if only one parameter is then that parameter consider as global class string
        globalClasses = parameter1
        handleGlobalClassesValue(globalClasses)
    }
    else {
        // 
    }

    concatClassesStr = globalClassesStr.concat(" ", mdlClassesStr).trim()
    return concatClassesStr
}