import Repository from "./Repository";
const resourse = '/hobbies';

export default {
  getHobbies() {
    return Repository.get(`${resourse}`);
}
}