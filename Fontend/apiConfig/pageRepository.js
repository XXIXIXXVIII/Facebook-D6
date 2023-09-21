import Repository from "./Repository";
const resourse = "/pages"

export default {
   createPage({payload}){
    console.log(payload);;
    return  Repository.post(`${resourse}/createPage`,payload)
  },

  getProfilePage({pageId}){
    return  Repository.get(`${resourse}/dashboard/${pageId}`)
  },
  
  getAllPage({userId}){
    return Repository.get(`${resourse}/allpages/info/${userId}`)
  }

}