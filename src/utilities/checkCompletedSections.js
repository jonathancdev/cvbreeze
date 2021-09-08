// if
//     (there is no avatar in storage OR if avatar info is stored as "enabled" (should probably chagne))
//     OR
//     there is no profile in storage
//     OR
//     (there is no workexp in storage OR the workexp array is empty)
//     OR
//     (there is no education in storage OR the education array is empty)
//     OR
//     (there is no skills in storage OR the skills array is empty)
//     OR
// (    there is no contact in storage OR value of contact.tel or email is placeholder or empty )(should probably improve this)

// return false

// else return true
    const check = (key) => {
        return localStorage.getObject(key)
    }
function checkCompletedSections (userId) {
    //check if user logged in
    const checkUser = check('currentUser') ? true : false;
    const checkPhotoData = (check(userId + '_photoData').filePath && check(userId + '_photoData').userPhoto)  ? true : false; 
    if (checkUser && checkPhotoData) {
        return true;
    } else {
        return false;
    }
};

export default checkCompletedSections;