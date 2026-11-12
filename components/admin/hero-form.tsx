"use client";

import { useState } from "react";
import { saveHero, type HeroPayload } from "@/app/admin/hero/actions";
import {
  AddBtn,
  FormSection,
  Item,
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
import ImageField from "@/components/admin/image-field";

export default function HeroForm({ initial }: { initial: HeroPayload }) {
  const [greeting, setGreeting] = useState(initial.greeting);
  const [name, setName] = useState(initial.name);
  const [title, setTitle] = useState(initial.title);
  const [qualifications, setQualifications] = useState(initial.qualifications);
  const [avatarLetter, setAvatarLetter] = useState(initial.avatarLetter);
  const [bgImage, setBgImage] = useState(initial.bgImage);
  const [visible, setVisible] = useState(initial.visible);
  const [specialties, setSpecialties] = useState(initial.specialties);
  const [buttons, setButtons] = useState(initial.buttons);
  const { status, error, run } = useSave();

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        void run(() =>
          saveHero({
            greeting,
            name,
            title,
            qualifications,
            avatarLetter,
            bgImage,
            visible,
            specialties,
            buttons,
          })
        );
      }}
    >
      <FormSection title="إعدادات القسم">
        <div className="grid md:grid-cols-2 gap-4">
          <Text label="الترحيب" value={greeting} onChange={setGreeting} />
          <Text label="الاسم الكامل" value={name} onChange={setName} />
        </div>
        <Text
          label="المسمى الوظيفي (نص الآلة الكاتبة)"
          value={title}
          onChange={setTitle}
        />
        <Text
          label="سطر المؤهلات أسفل المسمى"
          value={qualifications}
          onChange={setQualifications}
        />
        <div className="grid md:grid-cols-2 gap-4">
          <Text
            label="حرف الصورة الرمزية"
            value={avatarLetter}
            onChange={setAvatarLetter}
          />
          <ImageField
            label="صورة الخلفية"
            value={bgImage}
            onChange={setBgImage}
          />
        </div>
        <Toggle
          label="إظهار القسم في الصفحة الرئيسية"
          checked={visible}
          onChange={setVisible}
        />
      </FormSection>

      <FormSection title="التخصصات">
        <StrList
          items={specialties.map((s) => s.label)}
          onChange={(labels) => setSpecialties(labels.map((label) => ({ label })))}
          addLabel="إضافة تخصص"
        />
      </FormSection>

      <FormSection title="أزرار الانتقال">
        <div className="space-y-3">
          {buttons.map((b, i) => (
            <Item
              key={i}
              title={b.label}
              index={i}
              total={buttons.length}
              onUp={() => setButtons(moveUp(buttons, i))}
              onDown={() => setButtons(moveDown(buttons, i))}
              onRemove={() => setButtons(buttons.filter((_, j) => j !== i))}
            >
              <div className="grid md:grid-cols-3 gap-3">
                <Text
                  label="النص"
                  value={b.label}
                  onChange={(v) => setButtons(setAt(buttons, i, { label: v }))}
                />
                <Text
                  label="الرابط"
                  value={b.href}
                  dir="ltr"
                  onChange={(v) => setButtons(setAt(buttons, i, { href: v }))}
                />
                <Select
                  label="النمط"
                  value={b.style}
                  onChange={(v) => setButtons(setAt(buttons, i, { style: v }))}
                  options={[
                    { value: "primary", label: "أساسي (ممتلئ)" },
                    { value: "outline", label: "محدد (إطار فقط)" },
                  ]}
                />
              </div>
            </Item>
          ))}
          <AddBtn
            onClick={() =>
              setButtons([...buttons, { label: "", href: "#", style: "primary" }])
            }
          >
            إضافة زر
          </AddBtn>
        </div>
      </FormSection>

      <SaveButton status={status} error={error} />
    </form>
  );
}
