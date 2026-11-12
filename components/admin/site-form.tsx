"use client";

import { useState } from "react";
import { saveSite, type SitePayload } from "@/app/admin/site/actions";
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

export default function SiteForm({ initial }: { initial: SitePayload }) {
  const [navbarBrand, setNavbarBrand] = useState(initial.navbarBrand);
  const [footerText, setFooterText] = useState(initial.footerText);
  const [links, setLinks] = useState(initial.links);
  const { status, error, run } = useSave();

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        void run(() => saveSite({ navbarBrand, footerText, links }));
      }}
    >
      <FormSection title="الإعدادات العامة">
        <div className="grid md:grid-cols-2 gap-4">
          <Text
            label="اسم العلامة في القائمة"
            value={navbarBrand}
            onChange={setNavbarBrand}
          />
          <Text
            label="نص سطر الفوتر"
            value={footerText}
            onChange={setFooterText}
          />
        </div>
      </FormSection>

      <FormSection title="روابط القائمة العلوية">
        <div className="space-y-3">
          {links.map((l, i) => (
            <Item
              key={i}
              title={l.label}
              index={i}
              total={links.length}
              onUp={() => setLinks(moveUp(links, i))}
              onDown={() => setLinks(moveDown(links, i))}
              onRemove={() => setLinks(links.filter((_, j) => j !== i))}
            >
              <div className="grid md:grid-cols-3 gap-3 items-end">
                <Text
                  label="النص"
                  value={l.label}
                  onChange={(v) => setLinks(setAt(links, i, { label: v }))}
                />
                <Text
                  label="الرابط"
                  value={l.href}
                  dir="ltr"
                  onChange={(v) => setLinks(setAt(links, i, { href: v }))}
                />
                <div className="pb-1">
                  <Toggle
                    label="ظاهر"
                    checked={l.visible}
                    onChange={(v) => setLinks(setAt(links, i, { visible: v }))}
                  />
                </div>
              </div>
            </Item>
          ))}
          <AddBtn
            onClick={() =>
              setLinks([...links, { label: "", href: "#", visible: true }])
            }
          >
            إضافة رابط
          </AddBtn>
        </div>
      </FormSection>

      <SaveButton status={status} error={error} />
    </form>
  );
}
