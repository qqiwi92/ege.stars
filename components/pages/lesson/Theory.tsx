import customComponents from "@/components/mdx/components";
import GradientScrollViewWrapper from "@/components/ui/GradientScrollViewWrapper";
import { TheoryLesson } from "@/lib/types/Lesson";
import { useTheme } from "@react-navigation/native";
import { useEventListener } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { VideoTrackChangeEventPayload } from "expo-video/build/VideoPlayerEvents.types";
import { cssInterop } from "nativewind";
import { memo } from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { RenderMdx } from "rn-mdx";

const StyledRenderMdx = cssInterop(RenderMdx, {
  className: {
    target: "componentStyle.text",
  },
});
const StyledVideoView = cssInterop(VideoView, {
  className: {
    target: "style",
  },
});
export default function Theory({ lessonData }: { lessonData: TheoryLesson }) {
  const { colors } = useTheme();

  return (
    <View className="h-full w-full flex-1">
      <GradientScrollViewWrapper
        enabled={lessonData.content.some((item) => item.type === "video")}
      >
        {(onScroll) => (
          <View className="flex-1">
            {/* Fixed video at the top */}
            {lessonData.content.some((item) => item.type === "video") && (
              <View className="absolute left-0 right-0 top-0 z-10 h-[300px] overflow-hidden rounded-xl bg-black">
                <Video
                  url={
                    lessonData.content.find((item) => item.type === "video")
                      ?.content ?? ""
                  }
                />
              </View>
            )}

            {/* Scrollable content with padding to account for fixed video */}
            <View
              style={{
                paddingTop: lessonData.content.some(
                  (item) => item.type === "video",
                )
                  ? 300
                  : 10,
                paddingBottom: 15,
              }}
              className="bg-black px-1 "
            >
              <View className="overflow-hidden rounded-xl ">
                <ScrollView
                  className="bg-card"
                  onScroll={onScroll}
                  scrollEventThrottle={16}
                  style={{ padding: 10 }}
                >
                  {lessonData.content.map((item, index) => {
                    if (item.type === "video") return null;

                    return (
                      <StyledRenderMdx
                        className="w-full text-foreground"
                        components={customComponents}
                        componentStyle={{
                          view: { backgroundColor: "blue" },
                          hr: {
                            backgroundColor: "red",
                            borderWidth: 3,
                            borderColor: "red",
                          },
                          list: { display: "flex" },
                          listUnordered: { display: "flex" },
                          listUnorderedItem: { color: "red" },
                        }}
                        key={item.content}
                      >
                        {item.content}
                      </StyledRenderMdx>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </View>
        )}
      </GradientScrollViewWrapper>
    </View>
  );
}

// const assetId = require("@/assets/images/me_at_the_zoo.mp4");

const Video = memo(({ url }: { url: string }) => {
  const { width } = useWindowDimensions();
  const player = useVideoPlayer(url, (player) => {
    player.play();
    player.loop = false;
    // player.currentTime = 3;
  });

  useEventListener(
    player,
    "videoTrackChange",
    (payload: VideoTrackChangeEventPayload) => {
      console.log("Player changed: ", payload.videoTrack);
    },
  );
  return (
    <VideoView
      // className="h-full border"
      style={{ width, height: 300 }}
      player={player}
      allowsFullscreen
      nativeControls={true}
      allowsPictureInPicture
    />
  );
});
