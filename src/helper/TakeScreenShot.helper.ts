import { toJpeg } from "html-to-image";

export const TakeScreenShotHelper = async (
  appRef: React.RefObject<HTMLDivElement>
) => {
  if (appRef.current) {
    const image = await toJpeg(appRef.current);
    const link = document.createElement("a");
    link.download = `fake-chat${Date.now()}.png`;
    link.href = image;
    link.click();
  }
};
