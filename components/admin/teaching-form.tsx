"use client";

import { useState } from "react";
import {
  saveTeaching,
  type TeachingDomainInput,
  type TeachingPayload,
} from "@/app/admin/teaching/actions";
import {
  AddBtn,
  FormSection,
  Item,
  SaveButton,
  Select,
  StrList,
  Text,
  TextArea,
  Toggle,
  moveDown,
  moveUp,
  setAt,
  useSave,
} from "@/components/admin/ui";

const colorOptions = [
  { value: "sky", label: "أزرق سماوي" },
  { value: "indigo", label: "نيلي" },
  { value: "emerald", label: "أخضر زمردي" },
  { value: "amber", label: "عنبري" },
];

const emptyDomain: TeachingDomainInput = {
  title: "",
  description: "",
  color: "sky",
  icon: "",
  courses: [],
};

export default function TeachingForm({
  initial,
}: {
  initial: TeachingPayload;
}) {
  const [title, setTitle] = useState(initial.title);
  const [subtitle, setSubtitle] = useState(initial.subtitle);
  const [visible, setVisible] = useState(initial.visible);
  const [domains, setDomains] = useState(initial.domains);
  const { status, error, run } = useSave();

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        void run(() => saveTeaching({ title, subtitle, visible, domains }));
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

      <FormSection title="المجالات والمقررات">
        <div className="space-y-3">
          {domains.map((d, i) => (
            <Item
              key={i}
              title={d.title}
              index={i}
              total={domains.length}
              onUp={() => setDomains(moveUp(domains, i))}
              onDown={() => setDomains(moveDown(domains, i))}
              onRemove={() => setDomains(domains.filter((_, j) => j !== i))}
            >
              <div className="space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <Text
                    label="عنوان المجال"
                    value={d.title}
                    onChange={(v) => setDomains(setAt(domains, i, { title: v }))}
                  />
                  <Select
                    label="لون التمييز"
                    value={d.color}
                    onChange={(v) => setDomains(setAt(domains, i, { color: v }))}
                    options={colorOptions}
                  />
                </div>
                <Text
                  label="وصف المجال"
                  value={d.description}
                  onChange={(v) =>
                    setDomains(setAt(domains, i, { description: v }))
                  }
                />
                <TextArea
                  label="أيقونة SVG (خاصية d)"
                  rows={2}
                  dir="ltr"
                  value={d.icon}
                  onChange={(v) => setDomains(setAt(domains, i, { icon: v }))}
                />
                <div>
                  <span className="block text-sm text-slate-400 mb-1.5">
                    المقررات
                  </span>
                  <StrList
                    items={d.courses}
                    onChange={(courses) => setDomains(setAt(domains, i, { courses }))}
                    addLabel="إضافة مقرر"
                  />
                </div>
              </div>
            </Item>
          ))}
          <AddBtn onClick={() => setDomains([...domains, { ...emptyDomain }])}>
            إضافة مجال
          </AddBtn>
        </div>
      </FormSection>

      <SaveButton status={status} error={error} />
    </form>
  );
}
