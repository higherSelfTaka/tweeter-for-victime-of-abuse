const getOtherUserImage = (images, currentUser)=>{
    return images?.filter(img=>img!==currentUser.image)[0]
}

export default getOtherUserImage

