import jwtDecode from "jwt-decode"
import axios from "axios"
const base_url = process.env.NEXT_PUBLIC_URL;

export const CreateorGetUser = async (res) => {
    const decode=jwtDecode(res.credential);
    
    const { name, email, picture } = decode;
    const user = {
        name:name,
        email:email,
        image:picture
    }
    const result=await axios.post(`${base_url}/api/auth/gauth`,user);
    localStorage.setItem("userId", result.data.id); 
}

export default CreateorGetUser;
