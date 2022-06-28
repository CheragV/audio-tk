export interface Track {
  id: string;
  url: string;
  title: string;
  duration: number;
  size: string;
  icon: any;
}

export type PlayerProps = {
  params: Track;
};
