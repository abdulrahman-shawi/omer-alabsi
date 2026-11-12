"use client";

import { useState } from "react";
import { saveAbout, type AboutPayload } from "@/app/admin/about/actions";
import {
  AddBtn,
  FormSection,
  Item,
  SaveButton,
  Text,
  TextArea,
  Toggle,
  moveDown,
  moveUp,
  setAt,
  useSave,
} from "@/components/admin/ui";

export default function AboutForm({ initial }: { initial: AboutPayload }) {
  const [title, setTitle] = useState(initial.title);
  const [subtitle, setSubtitle] = useState(initial.subtitle);
  const [visible, setVisible] = useState(initial.visible);
  const [paragraphs, setParagraphs] = useState(initial.paragraphs);
  const [stats, setStats] = useState(initial.stats);
  const { status, error, run } = useSave();

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        void run(() => saveAbout({ title, subtitle, visible, paragraphs, stats }));
      }}
    >
      <FormSection title="إعدادات القسم">
        <div className="grid md:grid-cols-2 gap-4">
          <Text label="العنوان" value={title} onChange={setTitle} />
          <Text label="الوصف المختصر" value={subtitle} onChange={setSubtitle} />
        </div>
        <Toggle
          label="إظهار القسم في الصفحة الرئيسية"
          checked={visible}
          onChange={setVisible}
        />
      </FormSection>

      <FormSection title="الفقرات التعريفية">
        <div className="space-y-3">
          {paragraphs.map((p, i) => (
            <Item
              key={i}
              title={`فقرة ${i + 1}`}
              index={i}
              total={paragraphs.length}
              onUp={() => setParagraphs(moveUp(paragraphs, i))}
              onDown={() => setParagraphs(moveDown(paragraphs, i))}
              onRemove={() => setParagraphs(paragraphs.filter((_, j) => j !== i))}
            >
              <TextArea
                label="النص"
                rows={3}
                value={p.text}
                onChange={(v) => setParagraphs(setAt(paragraphs, i, { text: v }))}
              />
            </Item>
          ))}
          <AddBtn onClick={() => setParagraphs([...paragraphs, { text: "" }])}>
            إضافة فقرة
          </AddBtn>
        </div>
      </FormSection>

      <FormSection title="بطاقات الإحصائيات">
        <div className="space-y-3">
          {stats.map((s, i) => (
            <Item
              key={i}
              title={s.label}
              index={i}
              total={stats.length}
              onUp={() => setStats(moveUp(stats, i))}
              onDown={() => setStats(moveDown(stats, i))}
              onRemove={() => setStats(stats.filter((_, j) => j !== i))}
            >
              <div className="grid md:grid-cols-2 gap-3">
                <Text
                  label="الرقم"
                  value={s.value}
                  onChange={(v) => setStats(setAt(stats, i, { value: v }))}
                />
                <Text
                  label="الوصف"
                  value={s.label}
                  onChange={(v) => setStats(setAt(stats, i, { label: v }))}
                />
              </div>
            </Item>
          ))}
          <AddBtn onClick={() => setStats([...stats, { value: "", label: "" }])}>
            إضافة إحصائية
          </AddBtn>
        </div>
      </FormSection>

      <SaveButton status={status} error={error} />
    </form>
  );
}
