export interface Track {
  id: string;
  url: string;
  title: string;
  duration: number;
  size: string;
}

export type PlayerProps = {
  params: Track;
};
