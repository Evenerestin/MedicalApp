import { useRouter } from "expo-router";
import React from "react";
import {
  ICEEmptyState,
  ICEProfileView,
} from "../../../../components/organisms/ice";
import { useICEProfile } from "../../../../context/AppContext";

export default function ICEPage() {
  const router = useRouter();
  const iceProfile = useICEProfile();

  const handleEdit = () => {
    router.push("/(pages)/profile/ice/edit");
  };

  const handleBack = () => {
    router.back();
  };

  const handleCreateProfile = () => {
    router.push("/(pages)/profile/ice/edit");
  };

  if (!iceProfile) {
    return (
      <ICEEmptyState
        onCreateProfile={handleCreateProfile}
        onBack={handleBack}
      />
    );
  }

  return (
    <ICEProfileView
      profile={iceProfile}
      onEdit={handleEdit}
      onBack={handleBack}
    />
  );
}
