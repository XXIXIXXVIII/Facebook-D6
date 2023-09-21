import cleanImgCover from '../../assets/img/cleanImgCover.jpg'
import partyImgCover from '../../assets/img/partyImgCover.jpg'
import familyCover from '../../assets/img/familyCover.jpg'
import gymsCover from '../../assets/img/gymsCover.jpg'
import musicCover from '../../assets/img/musicCover.jpg'


const featureNav = [
  {
    id: 1,
    name: 'Công cụ quản trị',
  },
  {
    id: 2,
    name: 'Cài đặt',
  },
  {
    id: 3,
    name: 'Thông tin chi tiết',
  },
  {
    id: 4,
    name: 'Hỗ trợ',
  },
]

const arrIllustration = [
  {
    id: 1,
    illustration: cleanImgCover,
  },
  {
    id: 2,
    illustration: partyImgCover,
  },
  {
    id: 3,
    illustration: familyCover,
  },
  {
    id: 4,
    illustration: gymsCover,
  },
  {
    id: 5,
    illustration: musicCover,
  },
]
const navIcon = [
  {
    id: 0,
    icon: 'icon-feels',
    name: 'Bảng feel của bạn',
    path: '/groups/feed',
  },
  {
    id: 1,
    icon: 'icon-discover',
    name: 'Khám phá',
    path: '/groups/feed/discover',
  },
  {
    id: 2,
    icon: 'icon-groups',
    name: 'Nhóm của bạn',
    path: '/groups/feed/joins',
  },
]
const content = [
  {
    id: 1,
    img: 'https://static.xx.fbcdn.net/rsrc.php/v3/y_/r/dyUE00V7yM0.png',
    name: 'Nội dung bị thành viên báo cáo',
    bacgroudColor:'#FB724B'
  },
  {
    id: 2,
    img: 'https://static.xx.fbcdn.net/rsrc.php/v3/yR/r/9VvqLPfGC0H.png',
    name: 'Thông báo kiểm duyệt',
    bacgroudColor:'#F7B928'
  },
  {
    id: 3,
    img: 'https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/SKGh9nTtBca.png',
    name: 'Bài viết đang chờ',
    bacgroudColor:'#54C7EC'
  },
  {
    id: 4,
    img: 'https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/cPVVi0CPFhD.png',
    name: 'Yêu cầu làm thành viên',
    bacgroudColor:'#45BD62'
  },
  {
    id: 5,
    img: 'https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/cdeXOR0jsEp.png',
    name: 'Chất lượng nhóm',
    bacgroudColor:'#9360F7'
  },
]

export {  featureNav, arrIllustration, navIcon, content }
