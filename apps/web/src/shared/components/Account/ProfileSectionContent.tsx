"use client";
import type { UserProfile } from "@repo/types/contracts";

import { AddressListSection } from "./AddressListSection";
import { PersonalInfoForm } from "./PersonalInfoForm";

type ProfileSectionContentProps = {
  user: UserProfile;
};

export const ProfileSectionContent = ({ user }: ProfileSectionContentProps) => {
  return (
    <div className="flex flex-col gap-8">
      <PersonalInfoForm user={user} />
      <AddressListSection />
    </div>
  );
};
