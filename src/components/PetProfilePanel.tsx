import { CalendarDays, Check, MapPin, PawPrint } from "lucide-react";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { PetProfile } from "../types";
import { createId, formatDate, petAge } from "../utils";

interface PetProfilePanelProps {
  pet: PetProfile | null;
  onSave: (pet: PetProfile) => void;
}

const emptyForm = { name: "", breed: "", birthday: "", city: "" };

export function PetProfilePanel({ pet, onSave }: PetProfilePanelProps) {
  const [form, setForm] = useState(emptyForm);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (pet) {
      setForm({ name: pet.name, breed: pet.breed, birthday: pet.birthday, city: pet.city });
    }
  }, [pet]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave({
      id: pet?.id ?? createId("pet"),
      ...form,
      createdAt: pet?.createdAt ?? new Date().toISOString(),
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="view-stack">
      <section className="page-intro">
        <span className="eyebrow">宠物档案</span>
        <h1>让每条记录都有明确的主角。</h1>
        <p>档案会保存在当前浏览器中，你可以随时回来修改。</p>
      </section>

      <section className="two-column-layout profile-layout">
        <form className="form-panel" onSubmit={handleSubmit}>
          <div className="panel-title">
            <div>
              <span className="section-index">01</span>
              <h2>{pet ? "编辑档案" : "添加宠物"}</h2>
            </div>
            {saved ? <span className="save-status"><Check size={15} /> 已保存</span> : null}
          </div>
          <div className="field-grid">
            <label className="field">
              <span>宠物姓名</span>
              <input
                required
                value={form.name}
                placeholder="例如：糯米"
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
            </label>
            <label className="field">
              <span>品种</span>
              <input
                required
                value={form.breed}
                placeholder="例如：英短 / 柯基"
                onChange={(event) => setForm({ ...form, breed: event.target.value })}
              />
            </label>
            <label className="field">
              <span>生日</span>
              <input
                required
                type="date"
                value={form.birthday}
                onChange={(event) => setForm({ ...form, birthday: event.target.value })}
              />
            </label>
            <label className="field">
              <span>所在城市</span>
              <input
                required
                value={form.city}
                placeholder="例如：杭州"
                onChange={(event) => setForm({ ...form, city: event.target.value })}
              />
            </label>
          </div>
          <button className="button primary" type="submit">
            <Check size={17} /> {pet ? "保存修改" : "创建档案"}
          </button>
        </form>

        <aside className="profile-preview">
          <div className="profile-avatar"><PawPrint size={52} /></div>
          <span className="preview-label">档案预览</span>
          <h2>{form.name || "等待认识它"}</h2>
          <p>{form.breed || "填写品种后显示"}</p>
          <dl className="profile-facts">
            <div><dt><CalendarDays size={17} /> 生日</dt><dd>{formatDate(form.birthday)}</dd></div>
            <div><dt><PawPrint size={17} /> 年龄</dt><dd>{form.birthday ? petAge(form.birthday) : "待补充"}</dd></div>
            <div><dt><MapPin size={17} /> 城市</dt><dd>{form.city || "待补充"}</dd></div>
          </dl>
        </aside>
      </section>
    </div>
  );
}
