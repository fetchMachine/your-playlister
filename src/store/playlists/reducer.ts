import CLIPS_ACTION_TYPES, { TClipsAction } from 'store/clips/types';
import { normalizePlaylists } from 'utils/normolize';
import PLAYLIST_ACTION_TYPES, { TPlaylistAction } from './types';

const defaultState: IPlaylistsBranch = {
  meta: {
    isError: false,
    isFetching: false,
  },
  entities: {},
  allEntities: [],
};

type TAction = TPlaylistAction | TClipsAction;

const reducer = (state = defaultState, action: TAction): IPlaylistsBranch => {
  switch (action.type) {
    case PLAYLIST_ACTION_TYPES.FETCHING:
      return {
        ...state,
        meta: {
          isError: false,
          isFetching: true,
        },
      };

    case PLAYLIST_ACTION_TYPES.FAILURE:
      return {
        ...state,
        meta: {
          isError: true,
          isFetching: false,
        },
      };

    case PLAYLIST_ACTION_TYPES.SUCCESS: {
      const playlists: IPlaylistEntites = normalizePlaylists(action.payload);

      return {
        meta: {
          isError: false,
          isFetching: false,
        },
        allEntities: [...state.allEntities, ...Object.keys(playlists)],
        entities: {
          ...state.entities,
          ...playlists,
        },
      };
    }

    case CLIPS_ACTION_TYPES.SUCCESS: {
      const { playlistId } = action.payload[0].snippet;
      const clipIds: string[] = action.payload.map((item: IResponseClip) => item.id);

      return {
        ...state,
        entities: {
          ...state.entities,
          [playlistId]: {
            ...state.entities[playlistId],
            clips: clipIds,
            clipCount: clipIds.length,
          },
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;
