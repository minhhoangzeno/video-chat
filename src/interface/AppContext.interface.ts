export interface IValueAppContext {
  playBip: () => void;
  setShowLoading: (el: boolean) => void;
  setLoadPercent: (el: number) => void;
  appRef: any;
  loadPercent: number;
}
