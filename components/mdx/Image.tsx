import { Image } from "expo-image";

export default function MdxImage({ src }: { src?: string }) {
//   console.log(src);
  return (
      <Image
        transition={1000}
        contentFit="contain"
        style={{ height: 300 }}
        source={{
          uri: src,
          cacheKey: src,
        }}
      />
  );
}
