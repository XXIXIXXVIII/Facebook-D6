import {
  turnRight,
  gear,
  questionMark,
  display,
  suggestion,
  logOut,
  keyboard,
  language,
  checkPrivacy,
  privacyCenter,
  activeDiary,
  feedSetting,
  mail,
  alert,
} from '../../assets/icons/icons'

// Cài đặt chính
export const settingValues = [
  {
    icon: gear,
    title: 'Cài đặt & quyền riêng tư',
    showMore: turnRight,
  },
  {
    icon: questionMark,
    title: 'Trợ giúp & hỗ trợ',
    showMore: turnRight,
  },
  {
    icon: display,
    title: 'Màn hình & trợ năng',
    showMore: turnRight,
  },
  {
    icon: suggestion,
    title: 'Đóng góp ý kiến',
    showMore: null,
  },
  {
    icon: logOut,
    title: 'Đăng xuất',
    showMore: null,
  },
]

// Cài đặt & quyền riêng tư
export const settingAndPrivacyValues = [
  {
    icon: gear,
    title: 'Cài đặt',
    showMore: null,
  },
  {
    icon: language,
    title: JSON.parse(localStorage.getItem("lang"))==="vi"?"Chuyển sang English": "Chuyển sang Tiếng Việt",
    showMore: null,
  },
  {
    icon: checkPrivacy,
    title: 'Kiểm tra quyền riêng tư',
    showMore: null,
  },
  {
    icon: privacyCenter,
    title: 'Trung tâm quyền riêng tư',
    showMore: null,
  },
  {
    icon: activeDiary,
    title: 'Nhật ký hoạt động',
    showMore: null,
  },
  {
    icon: feedSetting,
    title: 'Tùy chọn bảng Feed',
    showMore: null,
  },
]

// Trợ giúp & hỗ trợ
export const helpCenter = [
  {
    icon: questionMark,
    title: 'Trung tâm hỗ trợ',
    showMore: null,
  },
  {
    icon: mail,
    title: 'Hộp thư hỗ trợ',
    showMore: null,
  },
  {
    icon: alert,
    title: 'Báo cáo sự cố',
    showMore: null,
  },
]

// Màn hình & trợ năng
export const displaySetting = [
  {
    icon: keyboard,
    title: 'Bàn phím',
    showMore: turnRight,
  },
]
