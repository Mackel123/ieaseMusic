import { post } from 'utils/request';

interface IPlaylistTracksQuery {
    op: 'del' | 'add';
    pid: number;
    tracks: number;
}
// 收藏单曲到歌单 从歌单删除歌曲
export default (query: IPlaylistTracksQuery) => {
    const path = '/weapi/playlist/manipulate/tracks';
    const data = {
        op: query.op, // del,add
        pid: query.pid, // 歌单id
        trackIds: `[${query.tracks}]` // 歌曲id
    };
    return post(path, data);
};
