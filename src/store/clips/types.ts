enum CLIPS_ACTION_TYPES {
  FETCHING = 'CLIPS_FETCHING',
  SUCCESS = 'CLIPS_SUCCESS',
  FAILURE = 'CLIPS_FAILURE',
}

export default CLIPS_ACTION_TYPES;

export interface IClipsFetching {
  type: typeof CLIPS_ACTION_TYPES.FETCHING;
}

export interface IClipsSuccess {
  type: typeof CLIPS_ACTION_TYPES.SUCCESS;
  payload: TResponseClips;
}

export interface IClipsFailure {
  type: typeof CLIPS_ACTION_TYPES.FAILURE;
  payload: string;
}

export type TClipsAction = IClipsFetching | IClipsSuccess | IClipsFailure;