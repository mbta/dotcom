const nonLivePaths = [
    "/customer-support",
    "/schedules/.*/timetable"
]


export default ()=> {
    const currentPath = window.location.pathname
    if (nonLivePaths.find(checkPath=>currentPath.match(checkPath))){
        return false;
    }
    return true;
}