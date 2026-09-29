import {
  Activity,
  ArrowRight,
  CalendarClock,
  Heart,
  MapPin,
  PawPrint,
  Scale,
  Sparkles,
} from "lucide-react";
import type { HealthRecord, PetProfile, ViewKey } from "../types";
import { formatDate, petAge } from "../utils";

interface OverviewProps {
  pet: PetProfile | null;
  records: HealthRecord[];
  momentCount: number;
  onNavigate: (view: ViewKey) => void;
}

function upcomingReminder(records: HealthRecord[]) {
  const candidates = records.flatMap((record) => [
    record.nextVaccineDate
      ? { date: record.nextVaccineDate, label: "疫苗提醒" }
      : null,
    record.nextDewormingDate
      ? { date: record.nextDewormingDate, label: "驱虫提醒" }
      : null,
  ]);
  return candidates
    .filter((item): item is { date: string; label: string } => Boolean(item))
    .sort((a, b) => a.date.localeCompare(b.date))[0];
}

export function Overview({ pet, records, momentCount, onNavigate }: OverviewProps) {
  const latestRecord = [...records].sort((a, b) => b.date.localeCompare(a.date))[0];
  const reminder = upcomingReminder(records);

  return (
    <div className="view-stack">
      <section className="welcome-panel">
        <div className="welcome-copy">
          <span className="eyebrow"><Sparkles size={15} /> 今日陪伴</span>
          <h1>{pet ? `${pet.name}，今天也要开心长大。` : "从第一枚爪印开始记录。"}</h1>
          <p>
            {pet
              ? `把 ${pet.name} 的健康、日常和重要提醒放在一起，少一点遗忘，多一点安心。`
              : "先创建宠物档案，再记录体重、疫苗、驱虫和每一个值得记住的小日常。"}
          </p>
          <div className="button-row">
            <button className="button primary" type="button" onClick={() => onNavigate(pet ? "timeline" : "profile")}>
              {pet ? "记录今天" : "创建宠物档案"}
              <ArrowRight size={17} />
            </button>
            {pet ? (
              <button className="button ghost" type="button" onClick={() => onNavigate("health")}>
                添加健康记录
              </button>
            ) : null}
          </div>
        </div>
        <div className="pet-portrait" aria-label={pet ? `${pet.name} 的档案插图` : "待创建的宠物档案"}>
          <span className="portrait-sun" />
          <div className="portrait-pet">
            <PawPrint size={58} strokeWidth={1.5} />
          </div>
          <span className="portrait-name">{pet?.name ?? "新朋友"}</span>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading compact">
          <div>
            <span className="eyebrow">本周概览</span>
            <h2>重要信息，一眼看清</h2>
          </div>
        </div>
        <div className="metric-grid">
          <article className="metric-item mint">
            <span className="metric-icon"><Heart size={20} /></span>
            <p>陪伴年龄</p>
            <strong>{pet ? petAge(pet.birthday) : "待创建"}</strong>
            <small>{pet ? `${pet.breed} · ${pet.city}` : "先补充基本档案"}</small>
          </article>
          <article className="metric-item blue">
            <span className="metric-icon"><Scale size={20} /></span>
            <p>最近体重</p>
            <strong>{latestRecord?.weight ? `${latestRecord.weight} kg` : "暂无记录"}</strong>
            <small>{latestRecord ? formatDate(latestRecord.date) : "添加后自动显示"}</small>
          </article>
          <article className="metric-item coral">
            <span className="metric-icon"><CalendarClock size={20} /></span>
            <p>下次提醒</p>
            <strong>{reminder ? reminder.label : "暂无提醒"}</strong>
            <small>{reminder ? formatDate(reminder.date) : "可记录疫苗或驱虫日期"}</small>
          </article>
          <article className="metric-item yellow">
            <span className="metric-icon"><Activity size={20} /></span>
            <p>成长记录</p>
            <strong>{records.length + momentCount} 条</strong>
            <small>健康与日常合并统计</small>
          </article>
        </div>
      </section>

      <section className="quick-grid">
        <button className="quick-action" type="button" onClick={() => onNavigate("profile")}>
          <span><PawPrint size={20} /></span>
          <div><strong>宠物档案</strong><small>姓名、品种、生日与城市</small></div>
          <ArrowRight size={18} />
        </button>
        <button className="quick-action" type="button" onClick={() => onNavigate("health")}>
          <span><Activity size={20} /></span>
          <div><strong>健康记录</strong><small>体重、疫苗、驱虫与提醒</small></div>
          <ArrowRight size={18} />
        </button>
        <button className="quick-action" type="button" onClick={() => onNavigate("community")}>
          <span><MapPin size={20} /></span>
          <div><strong>看看同城</strong><small>浏览明确标注的演示社区</small></div>
          <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
}
