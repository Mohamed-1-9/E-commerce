import { useQuery } from "@tanstack/react-query";
import axios from "axios";
function useCategories() {
    function getAllCategories(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    const res=useQuery({
        queryKey:["getAllCategories"],
        queryFn:getAllCategories
    })
    return res
}

export default useCategories;