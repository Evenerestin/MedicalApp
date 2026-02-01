import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ICEEmptyState,
  ICEForm,
  ICEFormData,
  ICEProfileView,
} from "../../../../components/organisms/ice";
import {
  useAppDispatch,
  useICEProfile,
  useIsAuthenticated,
  useUser,
} from "../../../../context/AppContext";
import { DatabaseService } from "../../../../lib/database";
import { ICEProfile } from "../../../../types";

export default function ICEPage() {
  const router = useRouter();
  const contextICEProfile = useICEProfile();
  const isAuthenticated = useIsAuthenticated();
  const user = useUser();
  const dispatch = useAppDispatch();
  const [unauthenticatedProfile, setUnauthenticatedProfile] =
    useState<ICEProfile | null>(null);
  const [isLoading, setIsLoading] = useState(!isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      const loadProfile = async () => {
        try {
          const profile = await DatabaseService.getICEProfile();
          setUnauthenticatedProfile(profile);
        } catch (error) {
          console.error("Failed to load ICE profile:", error);
        } finally {
          setIsLoading(false);
        }
      };
      loadProfile();
    }
  }, [isAuthenticated]);

  const iceProfile = isAuthenticated
    ? contextICEProfile
    : unauthenticatedProfile;

  const handleBack = () => {
    router.back();
  };

  const handleCreateProfile = () => {
    if (!isAuthenticated) {
      return;
    }
    router.push("/(pages)/profile/ice/edit");
  };

  const handleSaveForm = async (data: ICEFormData) => {
    if (!user || !isAuthenticated) return;

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

  const handleCancelForm = () => {
    router.back();
  };

  if (!isAuthenticated && isLoading) {
    return <SafeAreaView style={{ flex: 1 }} edges={["bottom"]} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      {isAuthenticated ? (
        <ICEForm
          mode={contextICEProfile ? "edit" : "create"}
          initialData={
            contextICEProfile
              ? {
                  bloodType: contextICEProfile.bloodType,
                  allergies: contextICEProfile.allergies,
                  medications: contextICEProfile.medications,
                  medicalConditions: contextICEProfile.medicalConditions,
                  emergencyContacts: contextICEProfile.emergencyContacts,
                  organDonor: contextICEProfile.organDonor,
                  specialInstructions: contextICEProfile.specialInstructions,
                }
              : undefined
          }
          onSave={handleSaveForm}
          onCancel={handleCancelForm}
        />
      ) : (
        <>
          {!iceProfile ? (
            <ICEEmptyState
              onCreateProfile={handleCreateProfile}
              onBack={handleBack}
              isReadOnly={!isAuthenticated}
            />
          ) : (
            <ICEProfileView
              profile={iceProfile}
              onBack={handleBack}
              isReadOnly={!isAuthenticated}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}
