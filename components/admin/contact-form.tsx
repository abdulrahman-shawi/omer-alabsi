"use client";

import { useState } from "react";
import {
  saveContact,
  type ContactPayload,
} from "@/app/admin/contact/actions";
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

export default function ContactForm({ initial }: { initial: ContactPayload }) {
  const [title, setTitle] = useState(initial.title);
  const [subtitle, setSubtitle] = useState(initial.subtitle);
  const [bgImage, setBgImage] = useState(initial.bgImage);
  const [metaLine, setMetaLine] = useState(initial.metaLine);
  const [visible, setVisible] = useState(initial.visible);
  const [cards, setCards] = useState(initial.cards);
  const { status, error, run } = useSave();

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        void run(() =>
          saveContact({ title, subtitle, bgImage, metaLine, visible, cards })
        );
      }}
    >
      <FormSection title="إعدادات القسم">
        <div className="grid md:grid-cols-2 gap-4">
          <Text label="العنوان" value={title} onChange={setTitle} />
          <Text label="الوصف المختصر" value={subtitle} onChange={setSubtitle} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Text
            label="صورة الخلفية"
            value={bgImage}
            dir="ltr"
            onChange={setBgImage}
          />
          <Text
            label="سطر المعلومات أسفل البطاقات"
            value={metaLine}
            onChange={setMetaLine}
          />
        </div>
        <Toggle
          label="إظهار القسم في الصفحة الرئيسية"
          checked={visible}
          onChange={setVisible}
        />
      </FormSection>

      <FormSection title="بطاقات التواصل">
        <div className="space-y-3">
          {cards.map((c, i) => (
            <Item
              key={i}
              title={c.title}
              index={i}
              total={cards.length}
              onUp={() => setCards(moveUp(cards, i))}
              onDown={() => setCards(moveDown(cards, i))}
              onRemove={() => setCards(cards.filter((_, j) => j !== i))}
            >
              <div className="space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <Text
                    label="العنوان"
                    value={c.title}
                    onChange={(v) => setCards(setAt(cards, i, { title: v }))}
                  />
                  <Text
                    label="القيمة (الرقم/البريد)"
                    value={c.value}
                    dir="ltr"
                    onChange={(v) => setCards(setAt(cards, i, { value: v }))}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <Text
                    label="الرابط"
                    value={c.href}
                    dir="ltr"
                    onChange={(v) => setCards(setAt(cards, i, { href: v }))}
                  />
                  <Text
                    label="نص الرابط"
                    value={c.action}
                    onChange={(v) => setCards(setAt(cards, i, { action: v }))}
                  />
                </div>
                <TextArea
                  label="أيقونة SVG (خاصية d)"
                  rows={2}
                  dir="ltr"
                  value={c.icon}
                  onChange={(v) => setCards(setAt(cards, i, { icon: v }))}
                />
              </div>
            </Item>
          ))}
          <AddBtn
            onClick={() =>
              setCards([
                ...cards,
                { title: "", value: "", href: "", action: "", icon: "" },
              ])
            }
          >
            إضافة بطاقة تواصل
          </AddBtn>
        </div>
      </FormSection>

      <SaveButton status={status} error={error} />
    </form>
  );
}
