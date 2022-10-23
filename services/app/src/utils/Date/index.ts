export const now = () => {
    return new Date(
      new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })
    );
  };