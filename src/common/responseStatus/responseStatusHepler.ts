export const noteModuleEnt = "NOTE"
export const todoModuleEnt = "TODO"

export const createEnt = "CREATE"
export const updateEnt = "UPDATE"
export const deleteEnt = "DELETE"
export const getEnt = "GET"
export const getAllEnt = "GET_ALL"

export const successEnt = "SUCCESS"
export const errorEnt = "ERROR"

export const getResponseStatus = (module, operation, status) => (`${module}.${operation}_${status}`)