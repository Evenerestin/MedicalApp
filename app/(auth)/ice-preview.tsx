import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ICEEmptyState } from "../../components/organisms/ice/ICEEmptyState";
import { ICEProfilePreview } from "../../components/organisms/ice/ICEProfilePreview";
import { DatabaseService } from "../../lib/database";
import { ICEProfile } from "../../types";

export default function ICEPreviewScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<ICEProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DatabaseService.getICEProfile()
      .then(setProfile)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <SafeAreaView style={{ flex: 1 }} />;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      {profile ? (
        <ICEProfilePreview profile={profile} onClose={() => router.back()} />
      ) : (
        <ICEEmptyState onBack={() => router.back()} isReadOnly={true} />
      )}
    </SafeAreaView>
  );
}
