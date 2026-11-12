"use client";

import { useState } from "react";
import {
  saveGallery,
  type GalleryPayload,
} from "@/app/admin/gallery/actions";
import {
  AddBtn,
  FormSection,
  Item,
  SaveButton,
  Text,
  Toggle,
  moveDown,
  moveUp,
  setAt,
  useSave,
} from "@/components/admin/ui";

export default function GalleryForm({ initial }: { initial: GalleryPayload }) {
  const [title, setTitle] = useState(initial.title);
  const [subtitle, setSubtitle] = useState(initial.subtitle);
  const [note, setNote] = useState(initial.note);
  const [visible, setVisible] = useState(initial.visible);
  const [photos, setPhotos] = useState(initial.photos);
  const { status, error, run } = useSave();

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        void run(() => saveGallery({ title, subtitle, note, visible, photos }));
      }}
    >
      <FormSection title="إعدادات القسم">
        <div className="grid md:grid-cols-2 gap-4">
          <Text label="العنوان" value={title} onChange={setTitle} />
          <Text label="الوصف المختصر" value={subtitle} onChange={setSubtitle} />
        </div>
        <Text
          label="ملاحظة أسفل المعرض"
          value={note}
          onChange={setNote}
        />
        <Toggle
          label="إظهار القسم في الصفحة الرئيسية"
          checked={visible}
          onChange={setVisible}
        />
      </FormSection>

      <FormSection title="الصور">
        <div className="space-y-3">
          {photos.map((p, i) => (
            <Item
              key={i}
              title={p.title}
              index={i}
              total={photos.length}
              onUp={() => setPhotos(moveUp(photos, i))}
              onDown={() => setPhotos(moveDown(photos, i))}
              onRemove={() => setPhotos(photos.filter((_, j) => j !== i))}
            >
              <div className="grid md:grid-cols-3 gap-3">
                <Text
                  label="المسار أو الرابط"
                  value={p.src}
                  dir="ltr"
                  onChange={(v) => setPhotos(setAt(photos, i, { src: v }))}
                />
                <Text
                  label="العنوان"
                  value={p.title}
                  onChange={(v) => setPhotos(setAt(photos, i, { title: v }))}
                />
                <Text
                  label="التصنيف (اختياري)"
                  value={p.category}
                  onChange={(v) => setPhotos(setAt(photos, i, { category: v }))}
                />
              </div>
            </Item>
          ))}
          <AddBtn
            onClick={() =>
              setPhotos([...photos, { src: "", title: "", category: "" }])
            }
          >
            إضافة صورة
          </AddBtn>
        </div>
      </FormSection>

      <SaveButton status={status} error={error} />
    </form>
  );
}
