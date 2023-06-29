import { Pedometer } from "expo-sensors";
import type {
  PermissionResponse,
  Subscription,
} from "expo-sensors/build/Pedometer";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
  },
  stepsText: {
    fontSize: 40,
  },
  stepsValue: {
    fontSize: 60,
    fontWeight: "bold",
    color: "rgb(129 140 248)",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 10,
    paddingLeft: 10,
    textAlign: "center",
    shadowColor: "blue",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});

//type PedometerAvailable = "true" | "false" | "checking";

interface PedometerComponentProps {
  steps: number;
  setSteps: Dispatch<SetStateAction<number>>;
}

const PedometerComponent = ({ steps, setSteps }: PedometerComponentProps) => {
  
  //const [isPedometerAvailable, setIsPedometerAvailable] =
  //  useState<PedometerAvailable>("checking");
  //const [isPedometerPermissioned, setIsPedometerPermissioned] =
  //  useState<PermissionResponse | null>(null);
  
  const subscription = useRef<Subscription | null>(null);

  const subscribe = () => {
    
    //const isAvailable = await Pedometer.isAvailableAsync();
    //setIsPedometerAvailable(String(isAvailable) as "true" | "false");

   // if (isAvailable) {
      /*
      if (isPedometerPermissioned === null) {
        const permission = await Pedometer.requestPermissionsAsync();
        setIsPedometerPermissioned(permission);
      }
      */

      subscription.current = Pedometer.watchStepCount((result) => {
        setSteps(result.steps);
      });
    //}
  };

  useEffect(() => {
    subscribe();
    return () => subscription.current && subscription.current.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.stepsContainer}>
        <Text style={styles.stepsText}>You have done</Text>
        <Text style={styles.stepsValue}>{steps ?? "not sure how many"}</Text>
        <Text style={styles.stepsText}>steps.</Text>
      </View>
    </View>
  );
};

export default PedometerComponent;
