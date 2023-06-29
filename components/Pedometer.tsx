import { Pedometer } from "expo-sensors";
import type {
  PermissionResponse,
  Subscription,
} from "expo-sensors/build/Pedometer";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  stepsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  stepsText: {
    fontSize: 20,
  },
  stepsValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: "rgb(129 140 248)",
  },
});

type PedometerAvailable = "true" | "false" | "checking";

const PedometerComponent = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] =
    useState<PedometerAvailable>("checking");
  const [isPedometerPermissioned, setIsPedometerPermissioned] =
    useState<PermissionResponse | null>(null);
  const [currentStepCount, setCurrentStepCount] = useState<number | null>(null);
  const subscription = useRef<Subscription | null>(null);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable) as "true" | "false");

    if (isAvailable) {
      if (isPedometerPermissioned === null) {
        const permission = await Pedometer.requestPermissionsAsync();
        setIsPedometerPermissioned(permission);
      }
      subscription.current = Pedometer.watchStepCount((result) => {
        console.log("pedometer live step", result.steps);
        setCurrentStepCount(result.steps);
      });
    }
  };

  useEffect(() => {
    subscribe();
    return () => subscription.current && subscription.current.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text>
        The pedometer is{" "}
        {isPedometerAvailable === "true"
          ? "available!"
          : isPedometerAvailable === "false"
          ? "not available :("
          : "checking for availability..."}
      </Text>

      <Text>Permissions have been {isPedometerPermissioned?.status}</Text>
      <View style={styles.stepsContainer}>
        <Text style={styles.stepsText}>You have done</Text>
        <Text style={styles.stepsValue}>
          {currentStepCount ?? "not sure how many"}
        </Text>
        <Text style={styles.stepsText}>steps.</Text>
      </View>
    </View>
  );
};

export default PedometerComponent;
