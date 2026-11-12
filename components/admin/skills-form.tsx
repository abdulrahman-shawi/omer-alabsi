"use client";

import { useState } from "react";
import {
  saveSkills,
  type LanguageInput,
  type SkillGroupInput,
  type SkillsPayload,
} from "@/app/admin/skills/actions";
import {
  AddBtn,
  FormSection,
  Item,
  Num,
  SaveButton,
  Select,
  StrList,
  Text,
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

const emptyGroup: SkillGroupInput = { title: "", color: "sky", skills: [] };
const emptyLanguage: LanguageInput = { name: "", code: "", level: "", percent: 50 };

export default function SkillsForm({ initial }: { initial: SkillsPayload }) {
  const [title, setTitle] = useState(initial.title);
  const [subtitle, setSubtitle] = useState(initial.subtitle);
  const [languagesTitle, setLanguagesTitle] = useState(initial.languagesTitle);
  const [visible, setVisible] = useState(initial.visible);
  const [groups, setGroups] = useState(initial.groups);
  const [languages, setLanguages] = useState(initial.languages);
  const { status, error, run } = useSave();

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        void run(() =>
          saveSkills({
            title,
            subtitle,
            languagesTitle,
            visible,
            groups,
            languages,
          })
        );
      }}
    >
      <FormSection title="إعدادات القسم">
        <div className="grid md:grid-cols-3 gap-4">
          <Text label="العنوان" value={title} onChange={setTitle} />
          <Text label="الوصف المختصر" value={subtitle} onChange={setSubtitle} />
          <Text
            label="عنوان بلوك اللغات"
            value={languagesTitle}
            onChange={setLanguagesTitle}
          />
        </div>
        <Toggle
          label="إظهار القسم في الصفحة الرئيسية"
          checked={visible}
          onChange={setVisible}
        />
      </FormSection>

      <FormSection title="مجموعات المهارات">
        <div className="space-y-3">
          {groups.map((g, i) => (
            <Item
              key={i}
              title={g.title}
              index={i}
              total={groups.length}
              onUp={() => setGroups(moveUp(groups, i))}
              onDown={() => setGroups(moveDown(groups, i))}
              onRemove={() => setGroups(groups.filter((_, j) => j !== i))}
            >
              <div className="space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <Text
                    label="عنوان المجموعة"
                    value={g.title}
                    onChange={(v) => setGroups(setAt(groups, i, { title: v }))}
                  />
                  <Select
                    label="لون التمييز"
                    value={g.color}
                    onChange={(v) => setGroups(setAt(groups, i, { color: v }))}
                    options={colorOptions}
                  />
                </div>
                <div>
                  <span className="block text-sm text-slate-400 mb-1.5">
                    المهارات
                  </span>
                  <StrList
                    items={g.skills}
                    onChange={(skills) => setGroups(setAt(groups, i, { skills }))}
                    addLabel="إضافة مهارة"
                  />
                </div>
              </div>
            </Item>
          ))}
          <AddBtn onClick={() => setGroups([...groups, { ...emptyGroup }])}>
            إضافة مجموعة مهارات
          </AddBtn>
        </div>
      </FormSection>

      <FormSection title="اللغات">
        <div className="space-y-3">
          {languages.map((l, i) => (
            <Item
              key={i}
              title={l.name}
              index={i}
              total={languages.length}
              onUp={() => setLanguages(moveUp(languages, i))}
              onDown={() => setLanguages(moveDown(languages, i))}
              onRemove={() =>
                setLanguages(languages.filter((_, j) => j !== i))
              }
            >
              <div className="grid md:grid-cols-4 gap-3">
                <Text
                  label="اللغة"
                  value={l.name}
                  onChange={(v) => setLanguages(setAt(languages, i, { name: v }))}
                />
                <Text
                  label="الكود (اختياري)"
                  value={l.code}
                  dir="ltr"
                  onChange={(v) => setLanguages(setAt(languages, i, { code: v }))}
                />
                <Text
                  label="المستوى"
                  value={l.level}
                  onChange={(v) => setLanguages(setAt(languages, i, { level: v }))}
                />
                <Num
                  label="النسبة %"
                  value={l.percent}
                  onChange={(v) =>
                    setLanguages(setAt(languages, i, { percent: v }))
                  }
                />
              </div>
            </Item>
          ))}
          <AddBtn
            onClick={() => setLanguages([...languages, { ...emptyLanguage }])}
          >
            إضافة لغة
          </AddBtn>
        </div>
      </FormSection>

      <SaveButton status={status} error={error} />
    </form>
  );
}
