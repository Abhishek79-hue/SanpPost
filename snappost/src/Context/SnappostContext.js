import { useContext,createContext } from "react";

export const SnappostContext=createContext({
posts:[],
addPost:(post)=>{},
UpdatePost:(_id,post)=>{},
deletePost:(id)=>{}
})

export const useSnappost=()=>{
  return useContext(SnappostContext)
}

export const SnappostProvider=SnappostContext.Provider
