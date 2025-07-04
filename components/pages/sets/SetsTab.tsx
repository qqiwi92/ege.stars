import { P } from "@/components/ui/typography";
import { View } from "react-native";

export default function SetsTab() {
  return (
    <View className="flex h-full flex-1 rounded-xl bg-card/25">
      <P>Варианты от учителя — это тщательно подобранные задания, созданные экспертами специально для твоей подготовки.</P>
      <P className="mx-auto py-2 px-4 underline text-secondary">Выполненные варианты</P>
    </View>
  );
}
