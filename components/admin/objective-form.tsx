"use client";

import { useState } from "react";
import {
  saveObjective,
  type ObjectivePayload,
} from "@/app/admin/objective/actions";
import {
  FormSection,
  SaveButton,
  StrList,
  Text,
  TextArea,
  Toggle,
  useSave,
} from "@/components/admin/ui";

export default function ObjectiveForm({
  initial,
}: {
  initial: ObjectivePayload;
}) {
  const [heading, setHeading] = useState(initial.heading);
  const [paragraph1, setParagraph1] = useState(initial.paragraph1);
  const [paragraph2, setParagraph2] = useState(initial.paragraph2);
  const [interestsTitle, setInterestsTitle] = useState(initial.interestsTitle);
  const [visible, setVisible] = useState(initial.visible);
  const [interests, setInterests] = useState(initial.interests);
  const { status, error, run } = useSave();

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        void run(() =>
          saveObjective({
            heading,
            paragraph1,
            paragraph2,
            interestsTitle,
            visible,
            interests,
          })
        );
      }}
    >
      <FormSection title="إعدادات القسم">
        <div className="grid md:grid-cols-2 gap-4">
          <Text label="العنوان الرئيسي" value={heading} onChange={setHeading} />
          <Text
            label="عنوان الاهتمامات"
            value={interestsTitle}
            onChange={setInterestsTitle}
          />
        </div>
        <Toggle
          label="إظهار القسم في الصفحة الرئيسية"
          checked={visible}
          onChange={setVisible}
        />
      </FormSection>

      <FormSection title="نص الهدف الأكاديمي">
        <TextArea
          label="الفقرة الأولى"
          rows={3}
          value={paragraph1}
          onChange={setParagraph1}
        />
        <TextArea
          label="الفقرة الثانية"
          rows={3}
          value={paragraph2}
          onChange={setParagraph2}
        />
      </FormSection>

      <FormSection title="الاهتمامات البحثية">
        <StrList
          items={interests}
          onChange={setInterests}
          addLabel="إضافة اهتمام"
        />
      </FormSection>

      <SaveButton status={status} error={error} />
    </form>
  );
}
