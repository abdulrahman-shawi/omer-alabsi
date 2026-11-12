"use client";

import { useState } from "react";
import {
  saveExperience,
  type ExperiencePayload,
} from "@/app/admin/experience/actions";
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
import ImageField from "@/components/admin/image-field";

export default function ExperienceForm({
  initial,
}: {
  initial: ExperiencePayload;
}) {
  const [title, setTitle] = useState(initial.title);
  const [subtitle, setSubtitle] = useState(initial.subtitle);
  const [bgImage, setBgImage] = useState(initial.bgImage);
  const [visible, setVisible] = useState(initial.visible);
  const [academicRole, setAcademicRole] = useState(initial.academicRole);
  const [academicField, setAcademicField] = useState(initial.academicField);
  const [academicPlace, setAcademicPlace] = useState(initial.academicPlace);
  const [academicDescription, setAcademicDescription] = useState(
    initial.academicDescription
  );
  const [academicNote, setAcademicNote] = useState(initial.academicNote);
  const [trainingItems, setTrainingItems] = useState(initial.trainingItems);
  const [organizations, setOrganizations] = useState(initial.organizations);
  const { status, error, run } = useSave();

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        void run(() =>
          saveExperience({
            title,
            subtitle,
            bgImage,
            visible,
            academicRole,
            academicField,
            academicPlace,
            academicDescription,
            academicNote,
            trainingItems,
            organizations,
          })
        );
      }}
    >
      <FormSection title="إعدادات القسم">
        <div className="grid md:grid-cols-2 gap-4">
          <Text label="العنوان" value={title} onChange={setTitle} />
          <Text label="الوصف المختصر" value={subtitle} onChange={setSubtitle} />
        </div>
        <ImageField
          label="صورة الخلفية"
          value={bgImage}
          onChange={setBgImage}
        />
        <Toggle
          label="إظهار القسم في الصفحة الرئيسية"
          checked={visible}
          onChange={setVisible}
        />
      </FormSection>

      <FormSection title="الخبرة الأكاديمية">
        <div className="grid md:grid-cols-3 gap-3">
          <Text label="المسمى" value={academicRole} onChange={setAcademicRole} />
          <Text label="المجال" value={academicField} onChange={setAcademicField} />
          <Text label="المكان" value={academicPlace} onChange={setAcademicPlace} />
        </div>
        <TextArea
          label="الوصف"
          rows={3}
          value={academicDescription}
          onChange={setAcademicDescription}
        />
        <TextArea
          label="ملاحظة جانبية"
          rows={2}
          value={academicNote}
          onChange={setAcademicNote}
        />
      </FormSection>

      <FormSection title="الخبرة التدريبية والمؤسسية">
        <div className="space-y-3">
          {trainingItems.map((t, i) => (
            <Item
              key={i}
              title={t.role}
              index={i}
              total={trainingItems.length}
              onUp={() => setTrainingItems(moveUp(trainingItems, i))}
              onDown={() => setTrainingItems(moveDown(trainingItems, i))}
              onRemove={() =>
                setTrainingItems(trainingItems.filter((_, j) => j !== i))
              }
            >
              <div className="space-y-3">
                <Text
                  label="المسمى"
                  value={t.role}
                  onChange={(v) => setTrainingItems(setAt(trainingItems, i, { role: v }))}
                />
                <Text
                  label="المكان"
                  value={t.place}
                  onChange={(v) => setTrainingItems(setAt(trainingItems, i, { place: v }))}
                />
                <TextArea
                  label="الوصف"
                  rows={2}
                  value={t.description}
                  onChange={(v) =>
                    setTrainingItems(setAt(trainingItems, i, { description: v }))
                  }
                />
              </div>
            </Item>
          ))}
          <AddBtn
            onClick={() =>
              setTrainingItems([
                ...trainingItems,
                { role: "", place: "", description: "" },
              ])
            }
          >
            إضافة خبرة تدريبية
          </AddBtn>
        </div>
      </FormSection>

      <FormSection title="المنظمات الدولية">
        <div className="space-y-3">
          {organizations.map((o, i) => (
            <Item
              key={i}
              title={o.abbr}
              index={i}
              total={organizations.length}
              onUp={() => setOrganizations(moveUp(organizations, i))}
              onDown={() => setOrganizations(moveDown(organizations, i))}
              onRemove={() =>
                setOrganizations(organizations.filter((_, j) => j !== i))
              }
            >
              <div className="grid md:grid-cols-2 gap-3">
                <Text
                  label="الاختصار"
                  value={o.abbr}
                  dir="ltr"
                  onChange={(v) =>
                    setOrganizations(setAt(organizations, i, { abbr: v }))
                  }
                />
                <Text
                  label="الاسم الكامل"
                  value={o.name}
                  onChange={(v) =>
                    setOrganizations(setAt(organizations, i, { name: v }))
                  }
                />
              </div>
            </Item>
          ))}
          <AddBtn
            onClick={() => setOrganizations([...organizations, { abbr: "", name: "" }])}
          >
            إضافة منظمة
          </AddBtn>
        </div>
      </FormSection>

      <SaveButton status={status} error={error} />
    </form>
  );
}
