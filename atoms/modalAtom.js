import {atom} from "recoil";


export const profileModalState = atom({
    key:"profileModalState",
    default:false,
});
  {/* modal is for tweet on tweet */}
export const modalState = atom({
    key:"modalState",
    default:false,
}); 
 {/* modal is for tweet  */}
export const tweetModalState =atom({
    key:"tweetModalState",
    default:false,
})


export const userIdState = atom({
    key:"userIdState",
    default:"",
});

export const listUserIdState = atom({
    key:"listUserIdState",
    default:"",
});


export const postIdState = atom({
    key:"postIdState",
    default:"",
});

export const chatIdState =atom({
    key:"chatIdState",
    default:""
})