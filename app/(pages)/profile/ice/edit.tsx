import { useRouter } from "expo-router";
import React from "react";
import { ICEForm, ICEFormData } from "../../../../components/organisms/ice";
import { useAppDispatch, useICEProfile } from "../../../../context/AppContext";
import { ICEProfile } from "../../../../types";

export default function EditICEPage() {
  const router = useRouter();
  const iceProfile = useICEProfile();
  const dispatch = useAppDispatch();

  const handleSave = (data: ICEFormData) => {
    const profile: ICEProfile = {
      id: iceProfile?.id || Date.now().toString(),
      userId: "current-user",
      bloodType: data.bloodType,
      allergies: data.allergies,
      medications: data.medications,
      medicalConditions: data.medicalConditions,
      emergencyContacts: data.emergencyContacts,
      organDonor: data.organDonor,
      specialInstructions: data.specialInstructions,
      createdAt: iceProfile?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (iceProfile) {
      dispatch({ type: "UPDATE_ICE_PROFILE", payload: profile });
    } else {
      dispatch({ type: "SET_ICE_PROFILE", payload: profile });
    }

    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ICEForm
      mode={iceProfile ? "edit" : "create"}
      initialData={
        iceProfile
          ? {
              bloodType: iceProfile.bloodType,
              allergies: iceProfile.allergies,
              medications: iceProfile.medications,
              medicalConditions: iceProfile.medicalConditions,
              emergencyContacts: iceProfile.emergencyContacts,
              organDonor: iceProfile.organDonor,
              specialInstructions: iceProfile.specialInstructions,
            }
          : undefined
      }
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
