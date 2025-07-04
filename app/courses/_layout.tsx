import { useTabBarStore } from "@/lib/stores/tabBarStore";
import { useFocusEffect } from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";

export default function CourseLayout() {
  const { setIsVisible } = useTabBarStore();
  useFocusEffect(
    React.useCallback(() => {
      setIsVisible(false);
      return () => {
        setIsVisible(true);
      };
    }, []),
  );
  return <Stack />;
}
