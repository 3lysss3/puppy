import {
  CalendarClock,
  HeartPulse,
  Plus,
  Scale,
  ShieldCheck,
  Syringe,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import type { HealthRecord } from "../types";
import { createId, formatDate, todayValue } from "../utils";
import { EmptyState } from "./EmptyState";

interface HealthPanelProps {
  records: HealthRecord[];
  onAdd: (record: HealthRecord) => void;
  onDelete: (id: string) => void;
}

const initialForm = () => ({
  date: todayValue(),
  weight: "",
  vaccine: "",
  nextVaccineDate: "",
  deworming: "",
  nextDewormingDate: "",
  notes: "",
});

function getNextReminder(records: HealthRecord[]) {
  const reminders = records.flatMap((record) => [
    record.nextVaccineDate ? { date: record.nextVaccineDate, label: "下次疫苗" } : null,
    record.nextDewormingDate ? { date: record.nextDewormingDate, label: "下次驱虫" } : null,
  ]);
  return reminders
    .filter((item): item is { date: string; label: string } => Boolean(item))
    .sort((a, b) => a.date.localeCompare(b.date))[0];
}

export function HealthPanel({ records, onAdd, onDelete }: HealthPanelProps) {
  const [form, setForm] = useState(initialForm);
  const sortedRecords = [...records].sort((a, b) => b.date.localeCompare(a.date));
  const latest = sortedRecords[0];
  const reminder = getNextReminder(records);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAdd({
      id: createId("health"),
      date: form.date,
      weight: form.weight ? Number(form.weight) : undefined,
      vaccine: form.vaccine.trim(),
      nextVaccineDate: form.nextVaccineDate,
      deworming: form.deworming.trim(),
      nextDewormingDate: form.nextDewormingDate,
      notes: form.notes.trim(),
    });
    setForm(initialForm());
  }

  return (
    <div className="view-stack">
      <section className="page-intro">
        <span className="eyebrow">健康记录</span>
        <h1>把健康变化变成连续、可回看的记录。</h1>
        <p>体重可单独记录；疫苗和驱虫信息按实际情况填写即可。</p>
      </section>

      <section className="metric-grid health-metrics">
        <article className="metric-item blue">
          <span className="metric-icon"><Scale size={20} /></span>
          <p>最近体重</p>
          <strong>{latest?.weight ? `${latest.weight} kg` : "暂无"}</strong>
          <small>{latest ? formatDate(latest.date) : "等待第一条记录"}</small>
        </article>
        <article className="metric-item coral">
          <span className="metric-icon"><CalendarClock size={20} /></span>
          <p>下次提醒</p>
          <strong>{reminder?.label ?? "暂无"}</strong>
          <small>{reminder ? formatDate(reminder.date) : "填写日期后显示"}</small>
        </article>
        <article className="metric-item mint">
          <span className="metric-icon"><HeartPulse size={20} /></span>
          <p>健康记录</p>
          <strong>{records.length} 条</strong>
          <small>仅保存在当前浏览器</small>
        </article>
      </section>

      <section className="two-column-layout health-layout">
        <form className="form-panel" onSubmit={handleSubmit}>
          <div className="panel-title">
            <div><span className="section-index">01</span><h2>录入健康信息</h2></div>
          </div>
          <div className="field-grid">
            <label className="field">
              <span>记录日期</span>
              <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </label>
            <label className="field">
              <span>体重（kg）</span>
              <input min="0" step="0.1" type="number" value={form.weight} placeholder="例如：4.6" onChange={(e) => setForm({ ...form, weight: e.target.value })} />
            </label>
            <label className="field">
              <span>疫苗信息</span>
              <input value={form.vaccine} placeholder="例如：猫三联第 2 针" onChange={(e) => setForm({ ...form, vaccine: e.target.value })} />
            </label>
            <label className="field">
              <span>下次疫苗日期</span>
              <input type="date" value={form.nextVaccineDate} onChange={(e) => setForm({ ...form, nextVaccineDate: e.target.value })} />
            </label>
            <label className="field">
              <span>驱虫信息</span>
              <input value={form.deworming} placeholder="例如：体内外驱虫" onChange={(e) => setForm({ ...form, deworming: e.target.value })} />
            </label>
            <label className="field">
              <span>下次驱虫日期</span>
              <input type="date" value={form.nextDewormingDate} onChange={(e) => setForm({ ...form, nextDewormingDate: e.target.value })} />
            </label>
            <label className="field full-field">
              <span>备注</span>
              <textarea rows={3} value={form.notes} placeholder="精神状态、食欲或医生建议等" onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </label>
          </div>
          <button className="button primary" type="submit"><Plus size={17} /> 保存健康记录</button>
        </form>

        <div className="records-panel">
          <div className="panel-title">
            <div><span className="section-index">02</span><h2>最近记录</h2></div>
            <span className="count-label">{records.length} 条</span>
          </div>
          {sortedRecords.length ? (
            <div className="record-list">
              {sortedRecords.slice(0, 6).map((record) => (
                <article className="health-record" key={record.id}>
                  <div className="record-date"><strong>{record.date.slice(8, 10)}</strong><span>{record.date.slice(5, 7)} 月</span></div>
                  <div className="record-content">
                    <div className="record-title-row">
                      <h3>{record.weight ? `${record.weight} kg` : "健康记录"}</h3>
                      <button className="icon-button" type="button" aria-label="删除这条健康记录" onClick={() => onDelete(record.id)}><Trash2 size={16} /></button>
                    </div>
                    <div className="record-tags">
                      {record.vaccine ? <span><Syringe size={14} /> {record.vaccine}</span> : null}
                      {record.deworming ? <span><ShieldCheck size={14} /> {record.deworming}</span> : null}
                    </div>
                    {record.notes ? <p>{record.notes}</p> : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="还没有健康记录" description="保存第一条记录后，最近体重和提醒会显示在这里。" />
          )}
        </div>
      </section>
    </div>
  );
}
