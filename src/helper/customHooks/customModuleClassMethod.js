// // To use module css with or without global classes
export const allClass = (globalClasses, mdlClasses, mdl) => {
    let concatClassesStr = "", globalClassesStr = "", mdlClassesStr = ""

    if (globalClasses !== undefined && mdlClasses !== undefined && mdl !== undefined) {
        // // e.g. allClass("globalClassesString", "moduleClassesString", mdlObject)
        // // first parameter is global class string & second parameter is module class string & third parameter is module class object
        if (typeof globalClasses === 'string' && globalClasses !== null && globalClasses) {
            globalClassesStr = globalClasses
        }

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
    else {
        // 
    }

    concatClassesStr = globalClassesStr.concat(" ", mdlClassesStr).trim()
    return concatClassesStr
}