import { Activity, BookHeart, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import type { DailyMoment, HealthRecord } from "../types";
import { createId, formatDate, todayValue } from "../utils";
import { EmptyState } from "./EmptyState";

interface TimelinePanelProps {
  records: HealthRecord[];
  moments: DailyMoment[];
  onAddMoment: (moment: DailyMoment) => void;
  onDeleteMoment: (id: string) => void;
}

type TimelineItem = {
  id: string;
  date: string;
  kind: "health" | "moment";
  title: string;
  content: string;
};

export function TimelinePanel({ records, moments, onAddMoment, onDeleteMoment }: TimelinePanelProps) {
  const [form, setForm] = useState({ date: todayValue(), title: "", content: "" });
  const items: TimelineItem[] = [
    ...records.map((record) => ({
      id: record.id,
      date: record.date,
      kind: "health" as const,
      title: record.weight ? `体重 ${record.weight} kg` : "健康记录",
      content: [record.vaccine, record.deworming, record.notes].filter(Boolean).join(" · ") || "已完成一次健康记录。",
    })),
    ...moments.map((moment) => ({ ...moment, kind: "moment" as const })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAddMoment({ id: createId("moment"), ...form });
    setForm({ date: todayValue(), title: "", content: "" });
  }

  return (
    <div className="view-stack">
      <section className="page-intro">
        <span className="eyebrow">成长时间线</span>
        <h1>健康数据之外，也别错过普通的一天。</h1>
        <p>健康记录会自动汇入时间线，你也可以添加散步、学习与陪伴日常。</p>
      </section>

      <section className="two-column-layout timeline-layout">
        <form className="form-panel sticky-panel" onSubmit={handleSubmit}>
          <div className="panel-title"><div><span className="section-index">01</span><h2>记录养宠日常</h2></div></div>
          <label className="field">
            <span>日期</span>
            <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </label>
          <label className="field">
            <span>标题</span>
            <input required value={form.title} placeholder="例如：第一次学会握手" onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </label>
          <label className="field">
            <span>今天发生了什么</span>
            <textarea required rows={5} maxLength={240} value={form.content} placeholder="写下一件想记住的小事……" onChange={(e) => setForm({ ...form, content: e.target.value })} />
            <small className="field-hint">{form.content.length}/240</small>
          </label>
          <button className="button primary" type="submit"><Plus size={17} /> 添加到时间线</button>
        </form>

        <div className="timeline-panel">
          <div className="panel-title"><div><span className="section-index">02</span><h2>成长足迹</h2></div><span className="count-label">{items.length} 条</span></div>
          {items.length ? (
            <div className="timeline-list">
              {items.map((item) => (
                <article className="timeline-item" key={`${item.kind}-${item.id}`}>
                  <div className={`timeline-dot ${item.kind}`} aria-hidden="true">
                    {item.kind === "health" ? <Activity size={17} /> : <BookHeart size={17} />}
                  </div>
                  <div className="timeline-copy">
                    <div className="timeline-meta">
                      <span>{item.kind === "health" ? "健康记录" : "养宠日常"}</span>
                      <time>{formatDate(item.date)}</time>
                    </div>
                    <div className="record-title-row">
                      <h3>{item.title}</h3>
                      {item.kind === "moment" ? (
                        <button className="icon-button" type="button" aria-label="删除这条日常" onClick={() => onDeleteMoment(item.id)}><Trash2 size={16} /></button>
                      ) : null}
                    </div>
                    <p>{item.content}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="时间线还是空的" description="添加一条健康记录或日常，它就会按日期出现在这里。" />
          )}
        </div>
      </section>
    </div>
  );
}
