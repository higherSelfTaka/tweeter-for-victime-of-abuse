const getOtherUserName = (users, currentUser)=>{
    return users?.filter(user=>user!==currentUser.name)[0]
}

export default getOtherUserName

