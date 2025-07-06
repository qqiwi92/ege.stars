import toHsla from "@/lib/toHsla";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { NativeScrollEvent, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface GradientScrollViewWrapperProps {
  children: (
    onScroll: (event: { nativeEvent: NativeScrollEvent }) => void,
  ) => React.ReactNode;
  horizontal?: boolean;
  style?: ViewStyle;
  shadeColor?: string;
  enabled?: boolean;
}

export default function GradientScrollViewWrapper({
  children,
  shadeColor,
  horizontal = false,
  style,
  enabled = true,
}: GradientScrollViewWrapperProps) {
  const { colors } = useTheme();
  const isAtStart = useSharedValue(true);
  const isAtEnd = useSharedValue(false);

  const startGradientStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isAtStart.value ? 0 : 1, { duration: 200 }),
  }));

  const endGradientStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isAtEnd.value ? 0 : 1, { duration: 200 }),
  }));

  const handleScroll = (event: { nativeEvent: NativeScrollEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    if (horizontal) {
      isAtStart.value = contentOffset.x <= 0;
      isAtEnd.value =
        layoutMeasurement.width + contentOffset.x >= contentSize.width - 5;
    } else {
      isAtStart.value = contentOffset.y <= 0;
      isAtEnd.value =
        layoutMeasurement.height + contentOffset.y >= contentSize.height - 5;
    }
  };
  if (!enabled) {
    return <View style={[{ flex: 1 }, style]}>{children(handleScroll)}</View>;
  }
  return (
    <View style={[{ flex: 1 }, style]}>
      <Animated.View
        style={[
          {
            position: "absolute",
            zIndex: 10,
            pointerEvents: "none",
          },
          horizontal
            ? { top: 0, bottom: 0, left: 0, width: 40 }
            : { top: 0, left: 0, right: 0, height: 40 },
          startGradientStyle,
        ]}
      >
        <LinearGradient
          colors={[
            toHsla(shadeColor ? shadeColor : colors.background, 1),
            "transparent",
          ]}
          start={horizontal ? { x: 0, y: 0 } : { x: 0, y: 0 }}
          end={horizontal ? { x: 1, y: 0 } : { x: 0, y: 1 }}
          style={{ flex: 1 }}
        />
      </Animated.View>

      {children(handleScroll)}

      <Animated.View
        style={[
          {
            position: "absolute",
            zIndex: 10,
            pointerEvents: "none",
          },
          horizontal
            ? { top: 0, bottom: 0, right: 0, width: 40 }
            : { bottom: 0, left: 0, right: 0, height: 40 },
          endGradientStyle,
        ]}
      >
        <LinearGradient
          colors={[
            "transparent",
            toHsla(shadeColor ? shadeColor : colors.background, 1),
          ]}
          start={horizontal ? { x: 0, y: 0 } : { x: 0, y: 0 }}
          end={horizontal ? { x: 1, y: 0 } : { x: 0, y: 1 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
}
