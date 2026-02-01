import { useRouter } from "expo-router";
import React from "react";
import { ICEForm, ICEFormData } from "../../../../components/organisms/ice";
import {
  useAppDispatch,
  useICEProfile,
  useUser,
} from "../../../../context/AppContext";
import { DatabaseService } from "../../../../lib/database";

export default function EditICEPage() {
  const router = useRouter();
  const iceProfile = useICEProfile();
  const dispatch = useAppDispatch();
  const user = useUser();

  const handleSave = async (data: ICEFormData) => {
    if (!user) return;

    try {
      const profile = await DatabaseService.saveICEProfile(user.id, {
        bloodType: data.bloodType,
        allergies: data.allergies,
        medications: data.medications,
        medicalConditions: data.medicalConditions,
        emergencyContacts: data.emergencyContacts,
        organDonor: data.organDonor,
        specialInstructions: data.specialInstructions,
      });

      dispatch({ type: "SET_ICE_PROFILE", payload: profile });
      router.replace("/(pages)");
    } catch (error) {
      console.error("Failed to save ICE profile:", error);
    }
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
