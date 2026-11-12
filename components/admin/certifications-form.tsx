"use client";

import { useState } from "react";
import {
  saveCertifications,
  type CertGroupInput,
  type CertificationsPayload,
} from "@/app/admin/certifications/actions";
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

const emptyGroup: CertGroupInput = { field: "", items: [] };

export default function CertificationsForm({
  initial,
}: {
  initial: CertificationsPayload;
}) {
  const [title, setTitle] = useState(initial.title);
  const [subtitle, setSubtitle] = useState(initial.subtitle);
  const [visible, setVisible] = useState(initial.visible);
  const [standardsTitle, setStandardsTitle] = useState(initial.standardsTitle);
  const [standardsIntro, setStandardsIntro] = useState(initial.standardsIntro);
  const [certGroupsTitle, setCertGroupsTitle] = useState(initial.certGroupsTitle);
  const [programsTitle, setProgramsTitle] = useState(initial.programsTitle);
  const [programsIntro, setProgramsIntro] = useState(initial.programsIntro);
  const [standards, setStandards] = useState(initial.standards);
  const [certGroups, setCertGroups] = useState(initial.certGroups);
  const [programs, setPrograms] = useState(initial.programs);
  const { status, error, run } = useSave();

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        void run(() =>
          saveCertifications({
            title,
            subtitle,
            visible,
            standardsTitle,
            standardsIntro,
            certGroupsTitle,
            programsTitle,
            programsIntro,
            standards,
            certGroups,
            programs,
          })
        );
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

      <FormSection title="أنظمة إدارة الجودة والمعايير الدولية">
        <div className="grid md:grid-cols-2 gap-4">
          <Text
            label="عنوان البلوك"
            value={standardsTitle}
            onChange={setStandardsTitle}
          />
        </div>
        <TextArea
          label="الوصف أسفل العنوان"
          rows={2}
          value={standardsIntro}
          onChange={setStandardsIntro}
        />
        <div className="space-y-3">
          {standards.map((s, i) => (
            <Item
              key={i}
              title={s.code}
              index={i}
              total={standards.length}
              onUp={() => setStandards(moveUp(standards, i))}
              onDown={() => setStandards(moveDown(standards, i))}
              onRemove={() => setStandards(standards.filter((_, j) => j !== i))}
            >
              <div className="grid md:grid-cols-2 gap-3">
                <Text
                  label="الكود"
                  value={s.code}
                  dir="ltr"
                  onChange={(v) => setStandards(setAt(standards, i, { code: v }))}
                />
                <Text
                  label="الاسم"
                  value={s.name}
                  onChange={(v) => setStandards(setAt(standards, i, { name: v }))}
                />
              </div>
            </Item>
          ))}
          <AddBtn
            onClick={() => setStandards([...standards, { code: "", name: "" }])}
          >
            إضافة معيار
          </AddBtn>
        </div>
      </FormSection>

      <FormSection title="الشهادات المهنية في الإدارة">
        <Text
          label="عنوان البلوك"
          value={certGroupsTitle}
          onChange={setCertGroupsTitle}
        />
        <div className="space-y-3">
          {certGroups.map((g, i) => (
            <Item
              key={i}
              title={g.field}
              index={i}
              total={certGroups.length}
              onUp={() => setCertGroups(moveUp(certGroups, i))}
              onDown={() => setCertGroups(moveDown(certGroups, i))}
              onRemove={() => setCertGroups(certGroups.filter((_, j) => j !== i))}
            >
              <div className="space-y-3">
                <Text
                  label="المجال"
                  value={g.field}
                  onChange={(v) => setCertGroups(setAt(certGroups, i, { field: v }))}
                />
                <div>
                  <span className="block text-sm text-slate-400 mb-1.5">
                    الشهادات
                  </span>
                  <StrList
                    items={g.items}
                    onChange={(items) => setCertGroups(setAt(certGroups, i, { items }))}
                    addLabel="إضافة شهادة"
                  />
                </div>
              </div>
            </Item>
          ))}
          <AddBtn onClick={() => setCertGroups([...certGroups, { ...emptyGroup }])}>
            إضافة مجال شهادات
          </AddBtn>
        </div>
      </FormSection>

      <FormSection title="برامج التنمية البشرية وورشات العمل">
        <div className="grid md:grid-cols-2 gap-4">
          <Text
            label="عنوان البلوك"
            value={programsTitle}
            onChange={setProgramsTitle}
          />
        </div>
        <TextArea
          label="الوصف أسفل العنوان"
          rows={2}
          value={programsIntro}
          onChange={setProgramsIntro}
        />
        <StrList
          items={programs}
          onChange={setPrograms}
          addLabel="إضافة برنامج"
        />
      </FormSection>

      <SaveButton status={status} error={error} />
    </form>
  );
}
