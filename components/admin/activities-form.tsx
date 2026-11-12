"use client";

import { useState } from "react";
import {
  saveActivities,
  type ActivitiesPayload,
} from "@/app/admin/activities/actions";
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

export default function ActivitiesForm({
  initial,
}: {
  initial: ActivitiesPayload;
}) {
  const [title, setTitle] = useState(initial.title);
  const [subtitle, setSubtitle] = useState(initial.subtitle);
  const [visible, setVisible] = useState(initial.visible);
  const [items, setItems] = useState(initial.items);
  const { status, error, run } = useSave();

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        void run(() => saveActivities({ title, subtitle, visible, items }));
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

      <FormSection title="الأنشطة">
        <div className="space-y-3">
          {items.map((item, i) => (
            <Item
              key={i}
              title={item.title}
              index={i}
              total={items.length}
              onUp={() => setItems(moveUp(items, i))}
              onDown={() => setItems(moveDown(items, i))}
              onRemove={() => setItems(items.filter((_, j) => j !== i))}
            >
              <div className="space-y-3">
                <Text
                  label="العنوان"
                  value={item.title}
                  onChange={(v) => setItems(setAt(items, i, { title: v }))}
                />
                <TextArea
                  label="الوصف"
                  rows={2}
                  value={item.description}
                  onChange={(v) =>
                    setItems(setAt(items, i, { description: v }))
                  }
                />
                <TextArea
                  label="أيقونة SVG (خاصية d)"
                  rows={2}
                  dir="ltr"
                  value={item.icon}
                  onChange={(v) => setItems(setAt(items, i, { icon: v }))}
                />
              </div>
            </Item>
          ))}
          <AddBtn
            onClick={() =>
              setItems([...items, { title: "", description: "", icon: "" }])
            }
          >
            إضافة نشاط
          </AddBtn>
        </div>
      </FormSection>

      <SaveButton status={status} error={error} />
    </form>
  );
}
