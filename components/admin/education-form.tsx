"use client";

import { useState } from "react";
import {
  saveEducation,
  type EducationDegreeInput,
  type EducationPayload,
} from "@/app/admin/education/actions";
import {
  AddBtn,
  FormSection,
  Item,
  SaveButton,
  StrList,
  Text,
  TextArea,
  Toggle,
  moveDown,
  moveUp,
  setAt,
  useSave,
} from "@/components/admin/ui";

const emptyDegree: EducationDegreeInput = {
  title: "",
  status: "",
  university: "",
  year: "",
  description: "",
  highlights: [],
};

export default function EducationForm({
  initial,
}: {
  initial: EducationPayload;
}) {
  const [title, setTitle] = useState(initial.title);
  const [subtitle, setSubtitle] = useState(initial.subtitle);
  const [visible, setVisible] = useState(initial.visible);
  const [degrees, setDegrees] = useState(initial.degrees);
  const { status, error, run } = useSave();

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        void run(() => saveEducation({ title, subtitle, visible, degrees }));
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

      <FormSection title="الدرجات العلمية">
        <div className="space-y-3">
          {degrees.map((d, i) => (
            <Item
              key={i}
              title={d.title}
              index={i}
              total={degrees.length}
              onUp={() => setDegrees(moveUp(degrees, i))}
              onDown={() => setDegrees(moveDown(degrees, i))}
              onRemove={() => setDegrees(degrees.filter((_, j) => j !== i))}
            >
              <div className="space-y-3">
                <div className="grid md:grid-cols-3 gap-3">
                  <Text
                    label="العنوان"
                    value={d.title}
                    onChange={(v) => setDegrees(setAt(degrees, i, { title: v }))}
                  />
                  <Text
                    label="الحالة (اختياري)"
                    value={d.status}
                    onChange={(v) => setDegrees(setAt(degrees, i, { status: v }))}
                  />
                  <Text
                    label="السنة"
                    value={d.year}
                    dir="ltr"
                    onChange={(v) => setDegrees(setAt(degrees, i, { year: v }))}
                  />
                </div>
                <Text
                  label="الجامعة / المؤسسة"
                  value={d.university}
                  onChange={(v) => setDegrees(setAt(degrees, i, { university: v }))}
                />
                <TextArea
                  label="الوصف"
                  rows={2}
                  value={d.description}
                  onChange={(v) =>
                    setDegrees(setAt(degrees, i, { description: v }))
                  }
                />
                <div>
                  <span className="block text-sm text-slate-400 mb-1.5">
                    النقاط البارزة
                  </span>
                  <StrList
                    items={d.highlights}
                    onChange={(highlights) =>
                      setDegrees(setAt(degrees, i, { highlights }))
                    }
                    addLabel="إضافة نقطة"
                  />
                </div>
              </div>
            </Item>
          ))}
          <AddBtn onClick={() => setDegrees([...degrees, { ...emptyDegree }])}>
            إضافة درجة علمية
          </AddBtn>
        </div>
      </FormSection>

      <SaveButton status={status} error={error} />
    </form>
  );
}
