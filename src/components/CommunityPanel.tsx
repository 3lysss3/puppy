import {
  Info,
  MapPin,
  MessageCircle,
  PawPrint,
  Send,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { demoFriends, demoPosts } from "../data/demo";
import type { CommunityPost, PetProfile } from "../types";
import { createId, formatDate, todayValue } from "../utils";
import { EmptyState } from "./EmptyState";

interface CommunityPanelProps {
  pet: PetProfile | null;
  personalPosts: CommunityPost[];
  onAddPost: (post: CommunityPost) => void;
  onDeletePost: (id: string) => void;
}

export function CommunityPanel({ pet, personalPosts, onAddPost, onDeletePost }: CommunityPanelProps) {
  const cities = useMemo(
    () => Array.from(new Set([pet?.city, ...demoFriends.map((friend) => friend.city)].filter(Boolean) as string[])),
    [pet?.city],
  );
  const [city, setCity] = useState(pet?.city || "全部");
  const [content, setContent] = useState("");
  const [postCity, setPostCity] = useState(pet?.city || cities[0] || "杭州");

  const friends = city === "全部" ? demoFriends : demoFriends.filter((friend) => friend.city === city);
  const posts = [...personalPosts, ...demoPosts]
    .filter((post) => city === "全部" || post.city === city)
    .sort((a, b) => b.date.localeCompare(a.date));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAddPost({
      id: createId("post"),
      author: "我",
      petName: pet?.name || "我的宠物",
      city: postCity,
      date: todayValue(),
      content: content.trim(),
      isDemo: false,
    });
    setContent("");
    setCity(postCity);
  }

  return (
    <div className="view-stack">
      <section className="page-intro community-intro">
        <div>
          <span className="eyebrow">同城社区</span>
          <h1>看看同城宠友今天在记录什么。</h1>
          <p>筛选城市、浏览示例内容，也可以发布只保存在本机的文字日常。</p>
        </div>
        <div className="demo-notice"><Info size={18} /><span><strong>演示社区</strong>预设宠友和帖子均为虚构演示数据，不代表真实用户或真实匹配。</span></div>
      </section>

      <section className="community-toolbar" aria-label="城市筛选">
        <div className="city-tabs">
          {["全部", ...cities].map((item) => (
            <button className={city === item ? "city-tab active" : "city-tab"} type="button" key={item} onClick={() => setCity(item)}>
              {item === "全部" ? <Sparkles size={15} /> : <MapPin size={15} />}{item}
            </button>
          ))}
        </div>
        <span className="filter-result">{city === "全部" ? "全部城市" : city} · {posts.length} 条动态</span>
      </section>

      <section className="community-layout">
        <div className="community-main">
          <form className="composer" onSubmit={handleSubmit}>
            <div className="composer-avatar"><PawPrint size={22} /></div>
            <div className="composer-body">
              <label htmlFor="post-content">发布一条养宠日常</label>
              <textarea
                id="post-content"
                required
                maxLength={200}
                rows={3}
                value={content}
                placeholder="分享今天和它发生的小事……"
                onChange={(event) => setContent(event.target.value)}
              />
              <div className="composer-footer">
                <label className="inline-select"><MapPin size={15} /><select value={postCity} onChange={(e) => setPostCity(e.target.value)}>{cities.map((item) => <option key={item}>{item}</option>)}</select></label>
                <span>{content.length}/200</span>
                <button className="button primary compact-button" type="submit"><Send size={15} /> 发布</button>
              </div>
            </div>
          </form>

          <div className="post-feed">
            {posts.length ? posts.map((post) => (
              <article className="community-post" key={post.id}>
                <div className={`post-avatar ${post.isDemo ? "demo" : "mine"}`}><PawPrint size={20} /></div>
                <div className="post-copy">
                  <div className="post-header">
                    <div><strong>{post.author}</strong><span>与 {post.petName}</span></div>
                    <div className="post-actions">
                      <span className={post.isDemo ? "data-badge demo" : "data-badge local"}>{post.isDemo ? "演示数据" : "本地发布"}</span>
                      {!post.isDemo ? <button className="icon-button" type="button" aria-label="删除这条本地动态" onClick={() => onDeletePost(post.id)}><Trash2 size={15} /></button> : null}
                    </div>
                  </div>
                  <p>{post.content}</p>
                  <div className="post-meta"><span><MapPin size={14} /> {post.city}</span><time>{formatDate(post.date)}</time><span><MessageCircle size={14} /> 仅作原型展示</span></div>
                </div>
              </article>
            )) : <EmptyState title="这个城市还没有内容" description="你可以发布第一条仅保存在本机的日常。" />}
          </div>
        </div>

        <aside className="friends-panel">
          <div className="panel-title"><div><span className="section-index">演示</span><h2>同城宠友</h2></div></div>
          <p className="panel-note">以下档案均为预设演示数据，不支持真实关注或联系。</p>
          {friends.length ? (
            <div className="friend-list">
              {friends.map((friend) => (
                <article className="friend-item" key={friend.id}>
                  <div className={`friend-avatar ${friend.color}`}><PawPrint size={21} /></div>
                  <div><strong>{friend.petName}</strong><span>{friend.breed} · {friend.name}</span></div>
                  <small>{friend.city}</small>
                </article>
              ))}
            </div>
          ) : <EmptyState title="暂无演示宠友" description="切换其他城市看看。" />}
        </aside>
      </section>
    </div>
  );
}
