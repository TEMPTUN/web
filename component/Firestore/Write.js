import 'firebase/firestore';
import { db } from '../../utils/fireconnect';
import {storage} from '../../utils/fireconnect';
import {getDownloadURL, ref,uploadBytesResumable} from 'firebase/storage';
// import { collection, query, getDocs, addDoc, deleteDoc,doc } from "firebase/firestore";
// import { fire } from '../../utils/firestore';



export const upf = (file) => {
        alert("ijijjj")
        console.log(file);
        const storageRef = ref(storage,`files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef,file);
        let ans=null;
        uploadTask.on('state_changed', (snapshot) =>{

        },(error)=>{
            console.log(error);
        },()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                console.log(downloadURL);
                ans = downloadURL;
            })
        })
        console.log(ans);
        return ans;
}

 