import type { CommunityPost, DemoFriend } from "../types";

export const demoFriends: DemoFriend[] = [
  { id: "friend-1", name: "林溪", petName: "糯米", breed: "比熊", city: "杭州", color: "coral" },
  { id: "friend-2", name: "小程", petName: "年糕", breed: "英短", city: "杭州", color: "blue" },
  { id: "friend-3", name: "阿乔", petName: "芝麻", breed: "柴犬", city: "上海", color: "green" },
  { id: "friend-4", name: "周周", petName: "泡芙", breed: "布偶猫", city: "北京", color: "blue" },
];

export const demoPosts: CommunityPost[] = [
  {
    id: "demo-post-1",
    author: "林溪",
    petName: "糯米",
    city: "杭州",
    date: "2026-09-26",
    content: "今天第一次尝试自己给糯米刷牙，配合度比预想中好。准备把每周三设成口腔护理日。",
    isDemo: true,
  },
  {
    id: "demo-post-2",
    author: "小程",
    petName: "年糕",
    city: "杭州",
    date: "2026-09-24",
    content: "天气凉快后恢复了晚间散步，年糕最近很喜欢沿河边闻树叶。",
    isDemo: true,
  },
  {
    id: "demo-post-3",
    author: "阿乔",
    petName: "芝麻",
    city: "上海",
    date: "2026-09-22",
    content: "复诊后医生建议继续观察体重变化，已经开始按周记录饮食和运动时长。",
    isDemo: true,
  },
  {
    id: "demo-post-4",
    author: "周周",
    petName: "泡芙",
    city: "北京",
    date: "2026-09-20",
    content: "换季掉毛进入高峰，今天整理了梳毛、饮水和环境清洁的日常清单。",
    isDemo: true,
  },
];
